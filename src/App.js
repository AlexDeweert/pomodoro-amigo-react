import React from 'react'
import LoginScreen from './LoginScreen'
import Home from './Home'
import ProtectedRoute from './ProtectedRoute'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Navigation from './Navigation'

function App() {
    return (
        <Router>
            <Navigation />
            <Switch>
                <Route path='/auth' component={LoginScreen}/>
                <ProtectedRoute path='/'><Home/></ProtectedRoute>
            </Switch>
        </Router>
    );
}

export default App;