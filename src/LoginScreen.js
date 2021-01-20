import React, {useRef, useContext} from 'react'
import Auth from './auth'
import {toast} from 'react-toastify'
import {UserContext} from './UserContext'

export default function LoginScreen(props) {
    // let user = useContext(UserContext).user
    // let setUser = useContext(UserContext).setUser
    let [user, setUser] = useContext(UserContext)

    const emailRef = useRef()
    const passwordRef = useRef()
    // const [apiToken, setApiToken] = useState( JSON.parse(localStorage.getItem('apiToken')) || null)

    //Similar to componentDidMount and componentDidUpdate
    // useEffect(() => {
    //     localStorage.setItem('apiToken', JSON.stringify(apiToken))
    // }, [apiToken])

    function loginOrRegisterCallback(result, toastMessage, toastId, email, api_token) {
        if(result) {
            props.history.push('/home')
            toast.success(toastMessage, {toastId: toastId})
            setUser({
                'email':email,
                'api_token':api_token
            })
        }
        else {
            toast.error(toastMessage)
            setUser({
                'email':null,
                'api_token':null
            })
        }   
    }

    function handleLogin() {
        Auth.login(loginOrRegisterCallback, emailRef, passwordRef)
    }

    function handleRegister() {
        Auth.register(loginOrRegisterCallback, emailRef, passwordRef)
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
            <h3>users email: {user['email'] || 'null'}</h3>
            <h3>users apiToken: {user['api_token'] || 'null'}</h3>
        </div>
    )
}