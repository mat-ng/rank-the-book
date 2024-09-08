class RankingsController < ApplicationController
  def index
    @books = Book.all().sort_by(&:rating).reverse
  end
end
