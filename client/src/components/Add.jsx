import React, { useState } from 'react'
import axios from 'axios'
import IsMobileBrowser from '../hooks/IsMobileBrowser.jsx'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'

const API_URL = process.env.API_URL


const Add = () => {
  const [newName, setNewName] = useState('')
  const [newNameError, setNewNameError] = useState('')
  const [newImage, setNewImage] = useState('')
  const [newImageError, setNewImageError] = useState('')
  const [requireLoginDialog, setRequireLoginDialog] = useState(false)
  const [successDialogOpen, setSuccessDialogOpen] = useState(false)

  const renderRequireLoginDialog = () => {
    const closeRequireLoginDialog = () => {
      setRequireLoginDialog(false)
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


  const renderSuccessDialog = () => {
    const closeSuccessDialog = () => {
      setNewName('')
      setNewImage('')
      setSuccessDialogOpen(false)
    }
    
    return (
      <Dialog open={successDialogOpen} onClose={closeSuccessDialog}>
        <DialogTitle style={{fontFamily: 'Trebuchet MS', fontSize: 23}}>{newName} was successfully added!</DialogTitle>
        <DialogContentText style={{padding: '0px 25px 30px', fontFamily: 'Trebuchet MS', fontSize: 17}}>Congratulations, <b>{newName}</b> was successfully added. Keep checking back on rankings to see where it ranks!</DialogContentText>
        <DialogActions style={{padding: '0px 10px 10px'}}>
          <Button onClick={closeSuccessDialog} variant='outlined'>Close</Button>
        </DialogActions>
      </Dialog>
    )
  }

  const handleNewBook = () => {
    if(!newName && !newImage) {
      setNewNameError('Please enter a name')
      setNewImageError('Please enter an image URL.')
      return
    }

    else if(!newName) {
      setNewNameError('Please enter a name.')
      setNewImageError('')
      return
    }

    else if(!newImage) {
      setNewNameError('')
      setNewImageError('Please enter an image URL.')
      return
    }

    else if(newName.length < 3 || newName.length > 15) {
      setNewNameError('Please enter a name between 3 and 15 characters.')
      setNewImageError('')
      return
    }

    const imageToCheck = new Image()
    imageToCheck.src = newImage
    imageToCheck.onload = () => {
      axios.get(API_URL + '/books')
      .then(res => {
        axios.post(API_URL + '/books', { name: newName, image: newImage, rating: res.data[res.data.length-1].rating }, {headers: {Authorization: 'Bearer ' + localStorage.accessToken}})
        .then(() => {
          setNewNameError('')
          setNewImageError('')
          setSuccessDialogOpen(true)
        })
        .catch(() => {
          setRequireLoginDialog(true)
        })
      })
    }
    imageToCheck.onerror = () => {
      setNewNameError('')
      setNewImageError('Oops! Please enter a valid image URL.')
    }
  }

  return (
    <div width='100%' style={{display: 'flex', justifyContent: 'center', marginTop: IsMobileBrowser() ? 50 : 80}}>
      {renderRequireLoginDialog()}
      {renderSuccessDialog()}
      { IsMobileBrowser() ?
        <Card style={{marginTop: 10, width: 300, border: '2px solid rgba(0, 0, 0, 0.12)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px 0px 30px' }}>
          <div style={{display: 'block'}}>
            <h1 style={{fontFamily: 'Trebuchet MS', fontSize: 25, textAlign: 'center'}}>Add a book</h1>
            <p style={{fontFamily: 'Trebuchet MS', fontSize: 17, marginTop: 27}}>Name</p>
            <TextField value={newName} onChange={e => setNewName(e.target.value)} placeholder='Enter name here' error={!!newNameError} helperText={newNameError} style={{backgroundColor: '#FFFFFF', width: '250px', marginTop: -8}} />
            <p style={{fontFamily: 'Trebuchet MS', fontSize: 17, marginTop: 30}}>Image URL</p>
            <TextField value={newImage} onChange={e => setNewImage(e.target.value)} placeholder='Paste URL here' error={!!newImageError} helperText={newImageError} style={{backgroundColor: '#FFFFFF', width: '250px', marginTop: -8}} />
            <p></p>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <Button onClick={handleNewBook} variant='contained' style={{width: '250px', margin: '22px 0 10px'}}>Submit</Button>
            </div>
          </div>
        </Card>
        :
        <Card style={{marginTop: 10, width: 500, border: '2px solid rgba(0, 0, 0, 0.12)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px 0px 30px' }}>
          <div style={{display: 'block'}}>
            <h1 style={{fontFamily: 'Trebuchet MS', fontSize: 25, textAlign: 'center'}}>Add a book</h1>
            <p style={{fontFamily: 'Trebuchet MS', fontSize: 17, marginTop: 27}}>Name</p>
            <TextField value={newName} onChange={e => setNewName(e.target.value)} placeholder='Enter name here' error={!!newNameError} helperText={newNameError} style={{backgroundColor: '#FFFFFF', width: '400px', marginTop: -8}} />
            <p style={{fontFamily: 'Trebuchet MS', fontSize: 17, marginTop: 30}}>Image URL</p>
            <TextField value={newImage} onChange={e => setNewImage(e.target.value)} placeholder='Paste URL here' error={!!newImageError} helperText={newImageError} style={{backgroundColor: '#FFFFFF', width: '400px', marginTop: -8}} />
            <p></p>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <Button onClick={handleNewBook} variant='contained' style={{width: '400px', margin: '22px 0 10px'}}>Submit</Button>
            </div>
          </div>
        </Card>
      }
    </div>
  )
}

export default Add
