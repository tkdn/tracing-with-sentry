Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # Almost every application defines a route for the root path ("/") at the top of this file.
  # root "articles#index"

  namespace :api do
    resources :hello, only: [:index]
    resources :articles, only: [:index, :show, :create]
  end
end
