import React, {useEffect,useRef,useContext} from 'react'
import Auth from './auth'
import {toast} from 'react-toastify'
import {UserContext} from './User/UserContext'
// import User from './user'

export default function LoginScreen(props) {
    // let user = useContext(UserContext).user
    // let setUser = useContext(UserContext).setUser
    let [user] = useContext(UserContext)

    const emailRef = useRef()
    const passwordRef = useRef()
    //const [apiToken] = useState( JSON.parse(localStorage.getItem('apiToken')) || null)

    //Similar to componentDidMount and componentDidUpdate
    // useEffect(() => {
    //     //localStorage.setItem('apiToken', JSON.stringify(apiToken))
    //     return () => {
    //         //If apiToken exists, we don't need to set it.
    //         localStorage.setItem('apiToken', JSON.stringify(apiToken))
    //     }
    // }, [apiToken])
    //Here we can do something like, on App load, first verify with the server that the
    //existing API token is valid (if there is indeed a token). If it is, proceed as normal
    //otherwise we revoke the current API token and force the user to login.
    useEffect(()=> {
        console.log("Checking if login is available with stored token...")
        if(!Auth.isAuthenticated()) {
            console.log("Client not authenticated, will try an apiToken login...")
            let api_token = JSON.parse(localStorage.getItem('apiToken'))
            if(api_token) {
                console.log("A token existed, attempting to communicate with server...")
                Auth.loginWithToken((result, toastMessage, toastId, email, api_token, user_id)=>{
                    if(result) {
                        props.history.push('/home')
                        toast.success(toastMessage, {toastId: toastId})
                        user.setEmail(email)
                        user.setApiToken(api_token)//probably not needed
                        user.setUserId(user_id)
                    }
                    else {
                        toast.error(toastMessage)
                    }
                },api_token)
            }
            else {
                console.log("There was no token. User must enter credentials or register")
                toast.info('Please log in or sign up to continue', {toastId: 'please-login-toast-id'})
            }
        }
        else {
            console.log("User is already authenticated (and logged in)")
        }
    }, [user,props.history])

    function loginOrRegisterCallback(result, toastMessage, toastId, email, api_token, user_id) {
        if(result) {
            props.history.push('/home')
            toast.success(toastMessage, {toastId: toastId})
            localStorage.setItem('apiToken', JSON.stringify(api_token))
            user.setEmail(email)
            user.setApiToken(api_token)
            user.setUserId(user_id)
        }
        else {
            toast.error(toastMessage)
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
            {/* <h3>users email: {user.getEmail() || 'null'}</h3>
            <h3>users apiToken: {user.getApiToken() || 'null'}</h3> */}
        </div>
    )
}