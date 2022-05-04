const winProbability = (book1, book2) => {
  return (1/(1 + (Math.pow(10, (book2-book1)/400))))*100
}

const win = (winner, loser) => {
  return winner + (100 - winProbability(winner, loser))
}

const loss = (loser, winner) => {
  return loser + (0 - winProbability(loser, winner))
}


export { winProbability, win, loss }
