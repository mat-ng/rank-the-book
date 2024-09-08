module RankingsHelper
  def calculate_ranking(book, books)
    index = books.index(book)
    ranking = ((index.to_f / (books.size - 1)) * 100).round
    ranking.zero? ? 1 : ranking
  end
end
