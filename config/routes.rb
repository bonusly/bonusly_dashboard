Rails.application.routes.draw do
  get 'company/dashboard' => 'bonusly_dashboard/dashboard#index'
end