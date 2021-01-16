import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import Auth from './auth'

//Example from https://reactrouter.com/web/example/auth-workflow
export default function ProtectedRoute({children, ...rest}) {
    return (
        <Route 
        {...rest} 
        render={
            ({ location }) => Auth.isAuthenticated() ? (children) : ( <Redirect to={{ pathname: '/auth', state: { from: location }}}/>)
        }
        />
    )
}