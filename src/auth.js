import axios from 'axios'

class Auth {
    constructor() {
        var apiToken = JSON.parse(localStorage.getItem('apiToken'));
        if(apiToken !== null) {
            console.log('apiToken is NOT null, setting authenticated to true')
            this.authenticated = true
        }
        else {
            console.log('apiToken IS NULL, setting this.authenticated to false')
            this.authenticated = false
        }
        console.log(this.authenticated)
    }

    logout = (callback) => {
        this.authenticated = false;
        localStorage.removeItem('apiToken')
        callback(true, 'Successfully logged out', 'logout-toast-id')
    }

    registerOrLogin = (callback, endpoint, emailRef, passwordRef, setApiToken) => {
        const config = { headers: {'Content-Type':'application/x-www-form-urlencoded'} }
        const params = new URLSearchParams()
        params.append('email',emailRef.current.value)
        params.append('password',passwordRef.current.value)
        const connString = process.env.REACT_APP_DB_STRING.concat('/',endpoint)
        axios.post(connString, params, config)
        .then((result)=> {
            if(result.status === 200) {
                setApiToken(result.data['token'])
                this.authenticated = true;
                callback(true, result.data['message'], 'auth-success-toast-id')
            }
        })
        .catch((error)=> {
            this.authenticated = false
            callback(false, error.response.data['message'])
            // if(endpoint === 'login') callback(false, error.response.data['message'], 'server-error-login-toast-id')
            // else callback(false, error.response.data['message'], 'server-error-register-toast-id')
        })
        emailRef.current.value = null
        passwordRef.current.value = null
    }

    login = (callback, emailRef, passwordRef, setApiToken) => {
        this.registerOrLogin(callback, 'login', emailRef, passwordRef, setApiToken)
    }
    
    register = (callback, emailRef, passwordRef, setApiToken) => {
        this.registerOrLogin(callback, 'register', emailRef, passwordRef, setApiToken)
    }

    isAuthenticated = () => {
        return this.authenticated
    }
}

export default new Auth();