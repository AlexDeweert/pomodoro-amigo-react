import React, {useRef, useState, useEffect} from 'react'
import Auth from './auth'

export default function LoginScreen(props) {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [apiToken, setApiToken] = useState( JSON.parse(localStorage.getItem('apiToken')) )
    
    //Similar to componentDidMount and componentDidUpdate
    useEffect(() => {
        localStorage.setItem('apiToken', JSON.stringify(apiToken))
    }, [apiToken])

    function handleLogin(e) {
        Auth.login(()=> {
            console.log('this is the login callback')
        })
    }

    function handleRegister(e) {
        Auth.register((result) => {
            if(result) {
                console.log('Registration successful')
                props.history.push('/home')
            }
            else {
                console.log('Registration failure')
            }
            
        }, emailRef, passwordRef, setApiToken)
    }
    return (
        <div>
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
            <h3>apiToken: {apiToken}</h3>
        </div>
    )
}