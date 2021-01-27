import React, {useState} from 'react'
import LoginScreen from './LoginScreen'
import Home from './Home'
import ProtectedRoute from './ProtectedRoute'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navigation from './Navigation'
import Landing from './Landing'
import {Slide,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import TimerCollection from './Timers/TimerCollection'
import {UserContext} from './User/UserContext'
import User from './User/user'

function App() {
    return (
        <Router>
            <UserContext.Provider value={useState(new User())}>
                <Navigation />
                <Switch>
                        <Route path='/auth' component={LoginScreen}/>
                        <ProtectedRoute path='/home'><Home/></ProtectedRoute>
                        <ProtectedRoute path='/collection'><TimerCollection/></ProtectedRoute>
                        <Route path='/' component={Landing}/>
                </Switch>
            </UserContext.Provider>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                transition={Slide}
                pauseOnFocusLoss
                pauseOnHover
                limit={3}
            />
        </Router>
    );
}

export default App;