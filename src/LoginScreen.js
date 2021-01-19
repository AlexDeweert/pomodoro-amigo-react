import React, {useRef, useState, useEffect, useContext} from 'react'
import Auth from './auth'
import {toast} from 'react-toastify'
import {UserContext} from './UserContext'

export default function LoginScreen(props) {
    const message = useContext(UserContext)
    const emailRef = useRef()
    const passwordRef = useRef()
    const [apiToken, setApiToken] = useState( JSON.parse(localStorage.getItem('apiToken')) || null)

    //Similar to componentDidMount and componentDidUpdate
    useEffect(() => {
        localStorage.setItem('apiToken', JSON.stringify(apiToken))
    }, [apiToken])

    function loginOrRegisterCallback(result, toastMessage, toastId) {
        if(result) {
            props.history.push('/home')
            toast.success(toastMessage, {toastId: toastId})
        }
        else {
            toast.error(toastMessage)
        }   
    }

    function handleLogin() {
        Auth.login(loginOrRegisterCallback, emailRef, passwordRef, setApiToken)
    }

    function handleRegister() {
        Auth.register(loginOrRegisterCallback, emailRef, passwordRef, setApiToken)
    }
    
    return (
        <div>
            <h1>{message}</h1>
            <h1>Auth</h1>
            <label>
                E-mail address
                <input type='text' ref={emailRef}></input>
            </label>
            <br/>
            <label>
                Password
                <input type='password' ref={passwordRef}></input>
            </label>
            <br/>
            <button label='submit' onClick={ handleLogin }>Login</button>
            <button label='submit' onClick={ handleRegister }>Register</button>
            <br/>
            <h3>apiToken: {apiToken || 'null'}</h3>
        </div>
    )
}