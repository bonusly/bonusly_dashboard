require 'rails'
require 'font-awesome-sass'

module BonuslyDashboard
  class Engine < Rails::Engine
    initializer :assets do |config|
      Rails.application.config.assets.precompile += [
          'app.js', 'Bonus.js', 'BonuslyDashboard.js', 'BonusManager.js', 'jquery-1.12.4.min.js', 'Manager.js',
          'Receiver.js', 'StatManager.js', 'Util.js', 'index.sass' ]
      Rails.application.config.assets.paths << root.join('app', 'assets', 'javascripts')
      Rails.application.config.assets.paths << root.join('app', 'assets', 'stylesheets')
    end
  end
end
