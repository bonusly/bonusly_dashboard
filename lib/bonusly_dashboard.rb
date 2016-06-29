require 'rails'

module BonuslyDashboard
  class Engine < Rails::Engine
    initializer :assets do |config|
      Rails.application.config.assets.precompile += %w{ app.js Bonus.js BonuslyDashboard.js BonusManager.js jquery-1.12.4.min.js Manager.js Receiver.js StatManager.js Util.js index.css }
      Rails.application.config.assets.paths << root.join('app', 'assets', 'javascripts')
      Rails.application.config.assets.paths << root.join('app', 'assets', 'stylesheets')
    end
  end
end
