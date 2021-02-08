import React, {useEffect,useRef,useContext,useCallback} from 'react'
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
    
    //This is where we load in the timers on user login
    let timerListCallback = useCallback(
        () => {
            console.log("timerListCallback")
            Auth.getTimers(user.getUserId(), (success, timerData)=> {
                if(success && timerData.length) {
                    let newTimers = {}
                    for(let idx in timerData) {
                        let timer = timerData[idx]
                        console.log(timer)
                        let newTimer = {
                            timer_id: timer.timer_id,
                            user_id: timer.user_id,
                            description: timer.description,
                            rank: timer.rank
                        }
                        newTimers[timer.timer_id] = newTimer
                    }
                    user.setTimers(newTimers)
                }
            })
        },[user]
    )

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
                        //If authorized set the users timers list in user context object
                        timerListCallback()
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
    }, [user,props.history,timerListCallback])

    function loginOrRegisterCallback(result, toastMessage, toastId, email, api_token, user_id) {
        if(result) {
            props.history.push('/home')
            toast.success(toastMessage, {toastId: toastId})
            localStorage.setItem('apiToken', JSON.stringify(api_token))
            user.setEmail(email)
            user.setApiToken(api_token)
            user.setUserId(user_id)
            timerListCallback()
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
        </div>
    )
}