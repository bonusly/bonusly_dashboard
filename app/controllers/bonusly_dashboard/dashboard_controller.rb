module BonuslyDashboard
  class DashboardController < ApplicationController
    skip_after_filter :intercom_rails_auto_include
    before_filter :ensure_api_key, only: :index

    def index
      override_x_frame_options('ALLOWALL')

      @access_token = access_token
      @company      = company
      @theme_color  = theme_color

      render layout: false
    end

    def version
      response = {
        status:  :ok,
        message: Gem.loaded_specs['bonusly_dashboard'].version.to_s
      }
      render json: response
    end

    def data
      render json: data_json
    end

    private

    def data_json
      Rails.cache.fetch("dashboard-data-#{params[:access_token]}", expires_in: 5.minutes) do
        {
          success: success?,
          stats: stats.as_json,
          bonuses: bonuses.as_json
        }
      end
    end

    def success?
      [stats, bonuses].all?(&:success?)
    end

    def stats
      @stats ||= Stats.new(base_url: request.base_url, params: params)
    end

    def bonuses
      @bonuses ||= Bonuses.new(base_url: request.base_url, params: params)
    end

    def access_token
      @access_token ||= params[:access_token].presence || current_user&.api_key&.access_token
    end

    def company
      @company ||= begin
        if api_key&.api_authenticatable.is_a?(Company)
          api_key.api_authenticatable
        elsif api_key&.api_authenticatable.is_a?(User) && api_key.api_authenticatable.active?
          api_key.api_authenticatable.company
        end
      end
    end

    def theme_color
      company.nil? ? BONUSLY::THEMES['dark']['brand'] : company_theme(company)[:brand]
    end

    def api_key
      @api_key ||= ApiKey.for_access_token(access_token).first
    end

    def ensure_api_key
      render text: 'Invalid access token provided', status: 401 unless api_key.present?
    end
  end
end
