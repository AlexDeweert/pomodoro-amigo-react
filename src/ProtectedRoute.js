import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import Auth from './auth'
// import {toast} from 'react-toastify'

//Example from https://reactrouter.com/web/example/auth-workflow
export default function ProtectedRoute({children, ...rest}) {
    return (
        <Route 
        {...rest} 
        render={
            ({ location }) => {
                if(Auth.isAuthenticated()) {
                    return (children)
                }
                else {
                    return (<Redirect to={{ pathname: '/auth', state: { from: location }}}/>)
                }
            }
        }
        />
    )
};