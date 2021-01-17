import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import Auth from './auth'
import {toast} from 'react-toastify'
// import {uuid} from 'uuidv4'

//Example from https://reactrouter.com/web/example/auth-workflow
export default function ProtectedRoute({children, ...rest}) {
    return (
        <Route 
        {...rest} 
        render={
            // ({ location }) => Auth.isAuthenticated() ? (children) : ( <Redirect to={{ pathname: '/auth', state: { from: location }}}/>)
            ({ location }) => {
                if(Auth.isAuthenticated()) {
                    return (children)
                }
                else {
                    toast.info('Please log in or sign up to continue', {toastId: 'please-login-toast-id'})
                    return (<Redirect to={{ pathname: '/auth', state: { from: location }}}/>)
                }
            }
        }
        />
    )
}