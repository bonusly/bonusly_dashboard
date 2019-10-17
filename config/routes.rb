Rails.application.routes.draw do
  get 'company/dashboard', to: redirect(path: 'company/digital_signage')
  get 'company/dashboard/version', to: redirect('company/digital_signage/version')
  get 'company/dashboard/data', to: redirect(path: 'company/digital_signage/data')
  get 'company/digital_signage' => 'bonusly_dashboard/dashboard#index'
  get 'company/digital_signage/version' => 'bonusly_dashboard/dashboard#version'
  get 'company/digital_signage/data' => 'bonusly_dashboard/dashboard#data'
end
