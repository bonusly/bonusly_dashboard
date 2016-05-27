Rails.application.routes.draw do
  match 'company/dashboard' => 'bonusly_dashboard/dashboard#index'
end