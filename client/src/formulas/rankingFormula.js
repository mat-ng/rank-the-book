const calculateRanking = (book, books) => {
  books.sort((book1, book2) => book1 - book2)

  const ranking = Math.round(books.indexOf(book)/(books.length-1)*100)

  return ranking === 0 ? 1 : ranking
}

export default calculateRanking
