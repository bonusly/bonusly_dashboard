module BonuslyDashboard
  class DashboardController < ApplicationController
    skip_after_action :intercom_rails_auto_include
    before_action     :set_x_frame_options_header
    before_action     :set_session, :ensure_api_key, only: :index

    def index
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

    def set_x_frame_options_header
      response.headers['X-FRAME-OPTIONS'] = 'ALLOWALL'
    end

    def data_json
      Rails.cache.fetch(cache_key, expires_in: 5.minutes) do
        {
          success: success?,
          stats:   stats.as_json,
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
      session[:access_token]
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

    def cache_key
      "dashboard-data-#{params[:access_token]}-#{params[:limit]}"
    end

    def ensure_api_key
      session[:access_token] = nil if api_key.nil?
    end

    def set_session
      session[:access_token] = params[:access_token].presence || current_user&.api_key&.access_token || session[:access_token]
      redirect_to params.permit!.except(:access_token) if params[:access_token].present?
    end
  end
end
