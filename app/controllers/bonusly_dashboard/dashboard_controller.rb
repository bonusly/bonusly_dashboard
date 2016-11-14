module BonuslyDashboard
  class DashboardController < ApplicationController
    skip_after_filter :intercom_rails_auto_include
    after_filter :allow_iframe, only: :index

    def index
      override_x_frame_options('ALLOW-FROM *')
      render layout: false
    end

    def version
      response = {status: :ok, message: Gem.loaded_specs['bonusly_dashboard'].version.to_s}
      render json: response
    end

    private
    def allow_iframe
      response.headers.except! 'X-Frame-Options'
    end
  end
end