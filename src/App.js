import React, {useEffect} from 'react'
import LoginScreen from './LoginScreen'
import Home from './Home'
import Landing from './Landing'
import ProtectedRoute from './ProtectedRoute'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

function App() {

    useEffect(()=> {
        console.log('useEffect called')
    })

    return (
        <Router>
            <div className='nav'>
                <ul>
                <li><Link to='/'>PomodoroAmigo</Link></li>
                    <li><Link to='/home'>Home</Link></li>
                    <li><Link to='/auth'>Auth</Link></li>
                </ul>
            </div>
            <Switch>
                <Route path='/auth' component={LoginScreen}/>
                {/* <Route path='/auth'><LoginScreen/></Route> */}
                <ProtectedRoute path='/home'><Home/></ProtectedRoute>
                <Route path='/'><Landing/></Route>
                
                {/* <ProtectedRoute path='/home'><Home/></ProtectedRoute> */}
                {/* <Route path='/' component={Landing}/> */}
                
            </Switch>
        </Router>
    );
}

export default App;