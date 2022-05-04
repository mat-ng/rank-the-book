import React, { useEffect, useState } from 'react'
import axios from 'axios'
import calculateRanking from '../formulas/rankingFormula.js'
import IsMobileBrowser from '../hooks/IsMobileBrowser.jsx'
import map from 'lodash/map'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import DeleteIcon from '@mui/icons-material/Delete'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const API_URL = process.env.API_URL


const Rankings = () => {
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState({})

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
  const [deleteSuccessfulDialogOpen, setDeleteSuccessfulDialogOpen] = useState(false)
  const [requireLoginDialog, setRequireLoginDialog] = useState(false)

  const refreshBooks = () => {
    axios.get(API_URL + '/books').then(res => {
      setBooks(res.data)
    })
  }

  useEffect(() => {
    refreshBooks()
  }, [])
  
  const renderDeleteConfirmation = () => {
    const closeConfirmationDialog = () => {
      setDeleteConfirmationOpen(false)
    }

    const handleDelete = () => {
      axios.delete(API_URL + '/books/' + selectedBook._id, {headers: {Authorization: 'Bearer ' + localStorage.accessToken}})
      .then(() => {
        setDeleteConfirmationOpen(false)
        setDeleteSuccessfulDialogOpen(true)
        refreshBooks()
      })
      .catch(() => {
        setRequireLoginDialog(true)
      })
    }

    return (
      <Dialog open={deleteConfirmationOpen} onClose={closeConfirmationDialog}>
        <DialogTitle style={{fontFamily: 'Trebuchet MS', fontSize: 23}}>Delete {selectedBook.name}?</DialogTitle>
        { books.length > 2 ?
          <DialogContentText style={{padding: '0px 25px 30px', fontFamily: 'Trebuchet MS', fontSize: 17}}>Are you sure you want to delete <b>{selectedBook.name}</b> from the rankings?</DialogContentText>
          :
          <DialogContentText style={{padding: '0px 25px 30px', fontFamily: 'Trebuchet MS', fontSize: 17}}>Sorry, <b>{selectedBook.name}</b> cannot be deleted at this time. A minimum of 2 books are required at all times.</DialogContentText>
        }
        
        <DialogActions style={{padding: '0px 10px 10px'}}>
          <Button onClick={closeConfirmationDialog} variant='outlined'>Cancel</Button>
          { books.length > 2 ?
            <Button onClick={handleDelete} variant='contained' style={{backgroundColor: '#d63e3e', color: '#FFFFFF'}}>Delete</Button>
            :
            null
          }
        </DialogActions>
      </Dialog>
    )
  }

  const renderDeleteSuccessfulDialog = () => {
    const closeDeleteSuccessfulDialog = () => {
      setDeleteSuccessfulDialogOpen(false)
    }

    return (
      <Dialog open={deleteSuccessfulDialogOpen} onClose={closeDeleteSuccessfulDialog}>
        <DialogTitle style={{fontFamily: 'Trebuchet MS', fontSize: 23}}>Delete Successful</DialogTitle>
        <DialogContentText style={{padding: '0px 25px 30px', fontFamily: 'Trebuchet MS', fontSize: 17}}><b>{selectedBook.name}</b> has been deleted from the rankings.</DialogContentText>
        <DialogActions style={{padding: '0px 10px 10px'}}>
          <Button onClick={closeDeleteSuccessfulDialog} variant='outlined'>Close</Button>
        </DialogActions>
      </Dialog>
    )
  }

  const renderRequireLoginDialog = () => {
    const closeRequireLoginDialog = () => {
      setRequireLoginDialog(false)
      setDeleteConfirmationOpen(false)
    }

    return (
      <Dialog open={requireLoginDialog} onClose={closeRequireLoginDialog}>
        <DialogTitle style={{fontFamily: 'Trebuchet MS', fontSize: 23}}>Please Login</DialogTitle>
        <DialogContentText style={{padding: '0px 25px 30px', fontFamily: 'Trebuchet MS', fontSize: 17}}>Sorry, this action requires authentication. Please navigate to the profile tab and login.</DialogContentText>
        <DialogActions style={{padding: '0px 10px 10px'}}>
            <Button onClick={closeRequireLoginDialog} variant='outlined'>Close</Button>
          </DialogActions>
      </Dialog>
    )
  }

  const deleteBook = book => {
    setSelectedBook(book)
    setDeleteConfirmationOpen(true)
  }

  const renderBooksCard = () => {
    return (
      <div>
      { IsMobileBrowser() ?
        <div>
          {map(books, (book, i) => 
            <Card key={`book-${i}`} style={{marginTop: 10, width: 350, background: '#FFFFFF', border: '2px solid rgba(0, 0, 0, 0.12)' }}>
              <div style={{display: 'flex'}}>
                <CardMedia component='img' sx={{ width: 130, height: 163 }} image={book.image} alt={book.name} />
                <CardContent style={{fontFamily: 'Trebuchet MS', fontSize: 20, lineHeight: 1.5}}>
                  <b>{book.name}</b><br/>
                  <span style={{fontSize: 15}}>Ranked as <b>#{i+1}</b> book</span><br/>
                  <span style={{fontSize: 15}}>In top <b>{calculateRanking(book, books)}%</b> of all books</span>
                </CardContent>
              </div>
              <Button onClick={() => deleteBook(book)} color='error' style={{float: 'right', color: 'red'}}><DeleteIcon style={{color: 'red'}}/></Button>
            </Card>
          )}
        </div>
        :
        <div>
          {map(books, (book, i) => 
            <Card key={`book-${i}`} style={{marginTop: 10, width: 700, background: '#FFFFFF', border: '2px solid rgba(0, 0, 0, 0.12)' }}>
              <div style={{display: 'flex'}}>
                <CardMedia component='img' sx={{ width: 130, height: 163 }} image={book.image} alt={book.name} />
                <CardContent style={{fontFamily: 'Trebuchet MS', fontSize: 23, lineHeight: 1.5}}>
                  <b>{book.name}</b><br/>
                  <span style={{fontSize: 18}}>Ranked as <b>#{i+1}</b> book</span><br/>
                  <span style={{fontSize: 18}}>In top <b>{calculateRanking(book, books)}%</b> of all books</span>
                </CardContent>
              </div>
              <Button onClick={() => deleteBook(book)} color='error' style={{float: 'right', color: 'red'}}><DeleteIcon style={{color: 'red'}}/></Button>
            </Card>
          )}
        </div>
      }
      </div>
    )
  }

  return (
    <div width='100%'>
      {renderRequireLoginDialog()}
      {renderDeleteSuccessfulDialog()}
      {renderDeleteConfirmation()}
      <div style={{display: 'flex', justifyContent: 'center', marginTop: 40 }} >
        {renderBooksCard()}
      </div>
    </div>
  )
}

export default Rankings
