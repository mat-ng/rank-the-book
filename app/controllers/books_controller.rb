class BooksController < ApplicationController
  include BooksHelper

  def index
    @books = Book.order("RANDOM()").limit(2)
  end

  def update_ratings
    winner = Book.find(params[:winner_id])
    loser = Book.find(params[:loser_id])

    winner.update(rating: win(winner.rating, loser.rating))
    loser.update(rating: loss(loser.rating, winner.rating))

    respond_to do
    end
  end
end
