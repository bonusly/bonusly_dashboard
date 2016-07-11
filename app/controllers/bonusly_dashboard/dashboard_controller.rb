module BonuslyDashboard
  class DashboardController < ApplicationController
    skip_after_filter :intercom_rails_auto_include

    def index
      render layout: false
    end

    def version
      response = {status: :ok, message: Gem.loaded_specs['bonusly_dashboard'].version.to_s}
      render json: response
    end
  end
end