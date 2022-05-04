import React, { useEffect, useState } from 'react'
import axios from 'axios'
import IsMobileBrowser from '../hooks/IsMobileBrowser.jsx'
import { winProbability, win, loss } from '../formulas/winFormulas.js'

import Button from '@mui/material/Button'
import CountUp from 'react-countup'
import DownRedTriangle from '../assets/DownRedTriangle.png'
import StraightGrayLine from '../assets/StraightGrayLine.png'
import UpGreenTriangle from '../assets/UpGreenTriangle.png'

const API_URL = process.env.API_URL


const BookSelection = () => {
  const [book1, setBook1] = useState({})
  const [book2, setBook2] = useState({})

  const [showResults, setShowResults] = useState(false)


  const refreshBooks = () => {
    axios.get(API_URL + '/books', {params: {action: 'getTwoRandoms'} }).then(res => {
      setBook1(res.data[0])
      setBook2(res.data[1])
    })
  }
  
  useEffect(() => {
    refreshBooks()
  }, [])

  const calculateNewRatings = (winner, loser) => {
    axios.patch(API_URL + '/books/' + winner._id, { rating: win(winner.rating, loser.rating) })
    axios.patch(API_URL + '/books/' + loser._id, { rating: loss(loser.rating, winner.rating) })
    setShowResults(true)
  }

  const renderResultsBook1 = () => {
    const odds = Math.round(winProbability(book1.rating, book2.rating))

    return (
      <div style={{marginTop: 10, width: IsMobileBrowser() ? '150px' : '280px'}}>
        { showResults ?
            <div style={{display: 'flex', alignItems: 'top'}}>
              <img src={odds > 50 ? UpGreenTriangle : odds < 50 ? DownRedTriangle : StraightGrayLine} width='25px' height='20px' />
              <CountUp 
                start={0}
                end={odds}
                suffix={`% of users prefer ${book1.name}`}
                style={{color: odds > 50 ? 'green' : odds < 50 ? 'red' : 'gray', marginLeft: 10, fontSize: 18, fontFamily: 'Trebuchet MS'}}
                onEnd={() => {
                  setTimeout(() => {
                    setShowResults(false)
                    refreshBooks()
                  }, 800)
                }}
              />
            </div>
          :
            null
        }
      </div>
    )
  }

  const renderResultsBook2 = () => {
    const odds = (Math.round(winProbability(book2.rating, book1.rating)))

    return (
      <div style={{marginTop: 10, width: IsMobileBrowser() ? '150px' : '280px'}}>
        { showResults ?
          <div style={{display: 'flex', alignItems: 'top'}}>
            <img src={odds > 50 ? UpGreenTriangle : odds < 50 ? DownRedTriangle : StraightGrayLine} width='25px' height='20px' />
            <CountUp start={0} end={odds} suffix={`% of users prefer ${book2.name}`} style={{color: odds > 50 ? 'green' : odds < 50 ? 'red' : 'gray', width: '280px', marginLeft: 10, fontSize: 18, fontFamily: 'Trebuchet MS'}} />
          </div>
          :
          null
        }
      </div>
    )
  }
  
  return (
    <div>
      <h1 style={{textAlign: 'center', margin: 30, fontSize: 28, fontWeight: 'normal', fontFamily: 'Trebuchet MS'}}>Would you rather read <b>{book1.name}</b> or <b>{book2.name}</b>?</h1>
      <div width='100%' style={{marginTop: 30, display: 'flex', justifyContent: 'center'}}>
        <div>
          { IsMobileBrowser() ? null : <h1 style={{fontFamily: 'Trebuchet MS', fontSize: 23, textAlign: 'center'}}>{book1.name}</h1> }
          <Button onClick={() => calculateNewRatings(book1, book2)} disableRipple> <img src={book1.image} width={IsMobileBrowser() ? '150px' : '288px'} height={IsMobileBrowser() ? '189px' : '360px'} style={{marginTop: -10}} /></Button>
          {renderResultsBook1()}
        </div>
        <div style={{marginLeft: IsMobileBrowser() ? 0 : 80}}>
          { IsMobileBrowser() ? null : <h1 style={{fontFamily: 'Trebuchet MS', fontSize: 23, textAlign: 'center'}}>{book2.name}</h1> }
          <Button onClick={() => calculateNewRatings(book2, book1)} disableRipple> <img src={book2.image} width={IsMobileBrowser() ? '150px' : '288px'} height={IsMobileBrowser() ? '189px' : '360px'} style={{marginTop: -10}} /></Button>
          {renderResultsBook2()}
        </div>
      </div>
    </div>
  )
}

export default BookSelection
