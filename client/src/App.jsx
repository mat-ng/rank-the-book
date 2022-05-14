import React from 'react'
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom'
import IsMobileBrowser from './hooks/IsMobileBrowser.jsx'

import Add from './components/Add.jsx'
import BookSelection from './components/BookSelection.jsx'
import Profile from './components/Profile.jsx'
import Rankings from './components/Rankings.jsx'

import AddCircleIcon from '@mui/icons-material/AddCircle'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import HomeIcon from '@mui/icons-material/Home'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import PersonIcon from '@mui/icons-material/Person'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'


const App = () => {
    if(IsMobileBrowser()) {
        return (
            <Router>
                <Route path ='/'  render={(history) => (
                    <CssBaseline>
                        <Box sx={{ marginRight: 'calc(-1 * (100vw - 100%))' }}>
                            <Tabs value={history.location.pathname} centered TabIndicatorProps={{style: {background:'#FFFFFF', marginBottom: 5}}} style={{backgroundColor: '#384249', minHeight: '65px'}}>
                                <Tab component={Link} value='/' label={<HomeIcon style={{color: '#FFFFFF', transform: 'scale(1.3)'}}/>} to='/' style={{color: '#FFFFFF', minWidth: '10px', marginTop: '7px'}} />
                                <Tab component={Link} value='/rankings' label={<LeaderboardIcon style={{color: '#FFFFFF', transform: 'scale(1.3)'}}/>} to='/rankings' style={{color: '#FFFFFF', minWidth: '10px', marginTop: '6px'}} />
                                <Tab component={Link} value='/add' label={<AddCircleIcon style={{color: '#FFFFFF', transform: 'scale(1.3)'}}/>} to='/add' style={{color: '#FFFFFF', minWidth: '10px', marginTop: '6px'}} />
                                <Tab component={Link} value='/profile' label={<PersonIcon style={{color: '#FFFFFF', transform: 'scale(1.5)'}}/>} to='/profile' style={{color: '#FFFFFF', minWidth: '10px', marginTop: '6px'}} />
                            </Tabs>
                        </Box>
                    </CssBaseline>
                )} />
    
                <Switch>
                    <Route exact path ='/' component={BookSelection} />
                    <Route path='/rankings' component={Rankings} />
                    <Route path ='/add' component={Add} />
                    <Route path='/profile' component={Profile} />
                    <Route><Redirect to='/'/></Route>
                </Switch>
            </Router>
        )
    }
    
    return (
        <Router>
            <Route path ='/'  render={(history) => (
                <CssBaseline>
                    <Box sx={{ marginRight: 'calc(-1 * (100vw - 100%))' }}>
                        <Tabs value={history.location.pathname} TabIndicatorProps={{style: {background:'#FFFFFF', marginBottom: 5}}} style={{backgroundColor: '#384249', minHeight: '65px'}}>
                            <Tab component={Link} label='Rank the Book' to='/' style={{color: '#FFFFFF', fontFamily: 'Trebuchet MS', fontSize: '25px', fontWeight: 'bold', marginTop: '5px', position: 'absolute', left: '50px'}} />
                            <Tab component={Link} value='/' label={<HomeIcon style={{color: '#FFFFFF', transform: 'scale(1.3)'}}/>} to='/' style={{color: '#FFFFFF', minWidth: '10px', marginTop: '7px', position: 'absolute', right: '265px'}} />
                            <Tab component={Link} value='/rankings' label={<LeaderboardIcon style={{color: '#FFFFFF', transform: 'scale(1.3)'}}/>} to='/rankings' style={{color: '#FFFFFF', minWidth: '10px', marginTop: '6px', position: 'absolute', right: '190px'}} />
                            <Tab component={Link} value='/add' label={<AddCircleIcon style={{color: '#FFFFFF', transform: 'scale(1.3)'}}/>} to='/add' style={{color: '#FFFFFF', minWidth: '10px', marginTop: '6px', position: 'absolute', right: '120px'}} />
                            <Tab component={Link} value='/profile' label={<PersonIcon style={{color: '#FFFFFF', transform: 'scale(1.5)'}}/>} to='/profile' style={{color: '#FFFFFF', minWidth: '10px', marginTop: '6px', position: 'absolute', right: '50px'}} />
                        </Tabs>
                    </Box>
                </CssBaseline>
            )} />

            <Switch>
                <Route exact path ='/' component={BookSelection} />
                <Route path='/rankings' component={Rankings} />
                <Route path ='/add' component={Add} />
                <Route path='/profile' component={Profile} />
                <Route><Redirect to='/'/></Route>
            </Switch>
        </Router>
    )
}

export default App
