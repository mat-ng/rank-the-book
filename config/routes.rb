Rails.application.routes.draw do
  root "books#index"
  patch "update_ratings", to: "books#update_ratings"

  get "rankings", to: "rankings#index"
end
