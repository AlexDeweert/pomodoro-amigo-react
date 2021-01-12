import React, {useRef} from 'react'

export default function LoginScreen() {
    const emailRef = useRef()
    const passwordRef = useRef()
    function handleSubmit(e) {
        const email = emailRef.current.value
        const password = passwordRef.current.value
        console.log("clickedSubmit with email: " + email + " and password: " + password)
        emailRef.current.value = null
        passwordRef.current.value = null
    }
    return (
        <div>
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
            <button label="submit" onClick={ handleSubmit }>Submit</button>
            <br/>
        </div>
    )
}