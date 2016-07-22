require 'rails'
require 'font-awesome-sass'

module BonuslyDashboard
  class Engine < ::Rails::Engine
    config.to_prepare do
      Rails.application.config.assets.precompile += %w(
        app.js
        Bonus.js
        BonuslyDashboard.js
        BonusManager.js
        Manager.js
        Stat.js
        StatManager.js
        Util.js
        index.css
        jquery-1.12.4.min.js
      )
    end
  end
end
