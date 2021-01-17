import React from 'react'
import LoginScreen from './LoginScreen'
import Home from './Home'
import ProtectedRoute from './ProtectedRoute'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navigation from './Navigation'
import Landing from './Landing'
import {Slide,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <Router>
            <Navigation />
            <Switch>
                <Route path='/auth' component={LoginScreen}/>
                <ProtectedRoute path='/home'><Home/></ProtectedRoute>
                <Route path='/' component={Landing}/>
            </Switch>
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