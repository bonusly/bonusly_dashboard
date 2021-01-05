module BonuslyDashboard
  class DashboardController < ApplicationController
    skip_after_action :intercom_rails_auto_include
    before_action     :set_x_frame_options_header
    before_action     :set_cookie, :ensure_api_key, only: :index

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
      @stats ||= Stats.new(base_url: request.base_url, params: api_params)
    end

    def bonuses
      @bonuses ||= Bonuses.new(base_url: request.base_url, params: api_params)
    end

    # Falling back to session to not break open dashboards while migrating to
    # cookies for iframe support
    def access_token
      cookies[:access_token] || session[:access_token]
    end

    def api_params
      params.merge(access_token: access_token)
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
      "dashboard-data-#{access_token}-#{params[:limit]}"
    end

    def ensure_api_key
      cookies[:access_token] = nil if api_key.nil?
    end

    def set_cookie
      cookies[:access_token] = {
        value: params[:access_token].presence || current_user&.api_key&.access_token || cookies[:access_token] || session[:access_token],
        secure: !(Rails.env.development? || Rails.env.test?)
      }
      redirect_to params.permit!.except(:access_token) if params[:access_token].present?
    end
  end
end
