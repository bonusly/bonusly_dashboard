Rails.application.routes.draw do
  get 'company/dashboard' => 'bonusly_dashboard/dashboard#index'
  get 'company/dashboard/version' => 'bonusly_dashboard/dashboard#version'
  get 'company/dashboard/data' => 'bonusly_dashboard/dashboard#data'
end
