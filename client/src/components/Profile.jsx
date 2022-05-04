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
import Link from '@mui/material/Link'

const API_URL = process.env.API_URL


const Profile = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const [createAccountDialogOpen, setCreateAccountDialogOpen] = useState(false)
  const [successCreateDialogOpen, setSuccessCreateDialogOpen] = useState(false)
  const [successLoginDialogOpen, setSuccessLoginDialogOpen] = useState(false)


  const renderCreateAccountDialog = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const closeCreateAccountDialog = () => {
      setCreateAccountDialogOpen(false)
    }

    const handleCreateAccount = () => {
      if(!username) {
        setPasswordError('')
        setUsernameError('Please enter a username')
        return
      }
  
      else if(!password) {
        setUsernameError('')
        setPasswordError('Please enter a password')
        return
      }
  
      axios.post(API_URL + '/users', { username: username, password: password })
      setCreateAccountDialogOpen(false)
      setSuccessCreateDialogOpen(true)
    }

    return (
      <Dialog open={createAccountDialogOpen} onClose={closeCreateAccountDialog}>
        <DialogTitle style={{fontFamily: 'Trebuchet MS', fontSize: 23}}>Create account</DialogTitle>
        <div style={{padding: '0px 25px 30px', marginTop: -15}}>
          <p style={{fontFamily: 'Trebuchet MS', fontSize: 17, marginTop: 17}}>New Username</p>
          <TextField value={username} onChange={e => setUsername(e.target.value)} placeholder='Enter username here' error={!!usernameError} helperText={usernameError} style={{backgroundColor: '#FFFFFF', width: '250px', marginTop: -8}} />
          <p style={{fontFamily: 'Trebuchet MS', fontSize: 17, marginTop: 27}}>New Password</p>
          <TextField value={password} type='password' onChange={e => setPassword(e.target.value)} placeholder='Enter password here' error={!!passwordError} helperText={passwordError} style={{backgroundColor: '#FFFFFF', width: '250px', marginTop: -8}} />
        </div>
        <DialogActions style={{padding: '0px 10px 20px'}}>
            <Button onClick={handleCreateAccount} variant='contained'>Submit</Button>
            <Button onClick={closeCreateAccountDialog} variant='outlined'>Cancel</Button>
          </DialogActions>
      </Dialog>
    )
  }

  const renderSuccessCreateDialog = () => {
    const closeSuccessCreateDialog = () => {
      setSuccessCreateDialogOpen(false)
    }
    
    return (
      <Dialog open={successCreateDialogOpen} onClose={closeSuccessCreateDialog}>
        <DialogTitle style={{fontFamily: 'Trebuchet MS', fontSize: 23}}>Your account was successfully added!</DialogTitle>
        <DialogContentText style={{padding: '0px 25px 30px'}}>Congratulations, your account was successfully added. You may now login with your new username and password!</DialogContentText>
        <DialogActions style={{padding: '0px 10px 10px'}}>
          <Button onClick={closeSuccessCreateDialog} variant='outlined'>Close</Button>
        </DialogActions>
      </Dialog>
    )
  }

  const renderSuccessLoginDialog  = () => {
    const closeSuccessLoginDialog = () => {
      setSuccessLoginDialogOpen(false)
    }
    
    return (
      <Dialog open={successLoginDialogOpen} onClose={closeSuccessLoginDialog}>
        <DialogTitle style={{fontFamily: 'Trebuchet MS', fontSize: 23}}>Your have successfully logged in!</DialogTitle>
        <DialogContentText style={{padding: '0px 25px 30px', fontFamily: 'Trebuchet MS', fontSize: 17}}>Your login was successful! You may now perform authenticated actions.</DialogContentText>
        <DialogActions style={{padding: '0px 10px 10px'}}>
          <Button onClick={closeSuccessLoginDialog} variant='outlined'>Close</Button>
        </DialogActions>
      </Dialog>
    )
  }

  const handleLogin = () => {
    axios.post(API_URL + '/authentication', { username: username, password: password } )
    .then(res => {
      localStorage.setItem('accessToken', res.data.accessToken)
      setLoginError('')
      setSuccessLoginDialogOpen(true)
    })
    .catch(() => {
      setLoginError('Invalid username or password.')
    })
  }


  return (
    <div width='100%' style={{display: 'flex', justifyContent: 'center', marginTop: IsMobileBrowser() ? 50 : 80}}>
      {renderSuccessCreateDialog()}
      {renderCreateAccountDialog()}
      {renderSuccessLoginDialog()}
      { IsMobileBrowser() ?
        <Card style={{marginTop: 10, width: 300, border: '2px solid rgba(0, 0, 0, 0.12)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px 0px 30px' }}>
          <div style={{display: 'block'}}>
            <h1 style={{fontFamily: 'Trebuchet MS', fontSize: 25, textAlign: 'center'}}>Login</h1>
            <p style={{fontFamily: 'Trebuchet MS', fontSize: 17, marginTop: 27}}>Username</p>
            <TextField onChange={e => setUsername(e.target.value)} placeholder='Enter username here' style={{backgroundColor: '#FFFFFF', width: '250px', marginTop: -8}} />
            <p style={{fontFamily: 'Trebuchet MS', fontSize: 17, marginTop: 30}}>Password</p>
            <TextField onChange={e => setPassword(e.target.value)} type='password' placeholder='Enter password here' error={!!loginError} helperText={loginError} style={{backgroundColor: '#FFFFFF', width: '250px', marginTop: -8}} />
            <p></p>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <Button onClick={handleLogin} variant='contained' style={{width: '250px', margin: '15px 0 10px'}}>Submit</Button>
            </div>
            <p style={{fontFamily: 'Trebuchet MS', fontSize: 16, width: '250px', marginBottom: -10}}>Don't have an account? Create one <Link onClick={() => setCreateAccountDialogOpen(true)}>here</Link></p>
          </div>
        </Card>
        :
        <Card style={{marginTop: 10, width: 500, border: '2px solid rgba(0, 0, 0, 0.12)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px 0px 30px' }}>
          <div style={{display: 'block'}}>
            <h1 style={{fontFamily: 'Trebuchet MS', fontSize: 25, textAlign: 'center'}}>Login</h1>
            <p style={{fontFamily: 'Trebuchet MS', fontSize: 17, marginTop: 27}}>Username</p>
            <TextField onChange={e => setUsername(e.target.value)} placeholder='Enter username here' style={{backgroundColor: '#FFFFFF', width: '400px', marginTop: -8}} />
            <p style={{fontFamily: 'Trebuchet MS', fontSize: 17, marginTop: 30}}>Password</p>
            <TextField onChange={e => setPassword(e.target.value)} type='password' placeholder='Enter password here' error={!!loginError} helperText={loginError} style={{backgroundColor: '#FFFFFF', width: '400px', marginTop: -8}} />
            <p></p>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <Button onClick={handleLogin} variant='contained' style={{width: '400px', margin: '15px 0 10px'}}>Submit</Button>
            </div>
            <p style={{fontFamily: 'Trebuchet MS', fontSize: 16, marginBottom: -10}}>Don't have an account? Create one <Link onClick={() => setCreateAccountDialogOpen(true)}>here</Link></p>
          </div>
        </Card>
      }
    </div>
  )
}

export default Profile
