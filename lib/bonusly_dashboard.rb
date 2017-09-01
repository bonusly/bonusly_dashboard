require 'rails'
require 'font-awesome-sass'

module BonuslyDashboard
  class Engine < ::Rails::Engine
    config.to_prepare do
      Rails.application.config.assets.precompile += %w(
        dashboard-manifest.js
        index.css
      )
    end
  end
end
