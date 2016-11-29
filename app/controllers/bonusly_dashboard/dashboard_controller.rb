module BonuslyDashboard
  class DashboardController < ApplicationController
    skip_after_filter :intercom_rails_auto_include
    after_filter :allow_iframe, only: :index
    before_filter :ensure_api_key, only: :index

    def index
      override_x_frame_options('ALLOW-FROM *')

      @access_token = access_token
      @company      = company
      @theme_color  = theme_color

      render layout: false
    end

    def version
      response = {status: :ok, message: Gem.loaded_specs['bonusly_dashboard'].version.to_s}
      render json: response
    end

    private

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

    def allow_iframe
      response.headers.except! 'X-Frame-Options'
    end
  end
end
