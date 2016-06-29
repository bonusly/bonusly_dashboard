require 'rails'

module BonuslyDashboard
  class Engine < Rails::Engine
    initializer :assets do |config|
      Rails.application.config.assets.precompile += %w{ app.js index.css }
      Rails.application.config.assets.paths << root.join('app', 'assets', 'javascripts')
      Rails.application.config.assets.paths << root.join('app', 'assets', 'stylesheets')
    end
  end
end
