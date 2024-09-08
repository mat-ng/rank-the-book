module BooksHelper
  def win_probability(book1, book2)
    (1 / (1 + (10 ** ((book2 - book1) / 400.0)))) * 100
  end

  def win(winner, loser)
    winner + (100 - win_probability(winner, loser))
  end

  def loss(loser, winner)
    loser + (0 - win_probability(loser, winner))
  end
end
