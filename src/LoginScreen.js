import React, {useRef, useState, useEffect} from 'react'
import axios from 'axios'
import Auth from './auth'

export default function LoginScreen() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [apiToken, setApiToken] = useState( localStorage.getItem('apiToken') )
    
    //Similar to componentDidMount and componentDidUpdate
    useEffect(() => {
        localStorage.setItem("apiToken", apiToken)
    }, [apiToken])

    function handleLogin(e) {
        Auth.login(()=> {
            
        })
    }

    function handleRegister(e) {
        const config = { headers: {'Content-Type':'application/x-www-form-urlencoded'} }
        const params = new URLSearchParams()
        params.append('email',emailRef.current.value)
        params.append('password',passwordRef.current.value)
        const connString = process.env.REACT_APP_DB_STRING.concat("/register")
        axios.post(connString, params, config)
        .then((result)=> {
            if(result.data['success']) {
                setApiToken(result.data['token'])
            }
        })
        .catch((err)=> {
            console.log("error on registration => ", err)
        })
        emailRef.current.value = null
        passwordRef.current.value = null
    }
    return (
        <div>
            <h1>Auth</h1>
            <label>
                E-mail address
                <input type="text" ref={emailRef}></input>
            </label>
            <br/>
            <label>
                Password
                <input type="password" ref={passwordRef}></input>
            </label>
            <br/>
            <button label="submit" onClick={ handleLogin }>Login</button>
            <button label="submit" onClick={ handleRegister }>Register</button>
            <br/>
            <h3>apiToken: {apiToken}</h3>
        </div>
    )
}