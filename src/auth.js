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

    registerOrLogin = (callback, endpoint, emailRef, passwordRef) => {
        let email = emailRef.current.value
        if(this.isValidEmailAddress(email)) {
            const config = { headers: {'Content-Type':'application/x-www-form-urlencoded'} }
            const params = new URLSearchParams()
            params.append('email',emailRef.current.value)
            params.append('password',passwordRef.current.value)
            const connString = process.env.REACT_APP_DB_STRING.concat('/',endpoint)
            axios.post(connString, params, config)
            .then((result)=> {
                if(result.status === 200) {
                    // setApiToken(result.data['token'])
                    this.authenticated = true;
                    callback(true, result.data['message'], 'auth-success-toast-id', email, result.data['token'])
                }
            })
            .catch((error)=> {
                this.authenticated = false
                callback(false, error.response.data['message'])
            })
            emailRef.current.value = null
            passwordRef.current.value = null
        }
        else {
            callback(false, 'Invalid e-mail address.')
        }
    }

    login = (callback, emailRef, passwordRef, setApiToken) => {
        this.registerOrLogin(callback, 'login', emailRef, passwordRef, setApiToken)
    }
    
    register = (callback, emailRef, passwordRef, setApiToken) => {
        this.registerOrLogin(callback, 'register', emailRef, passwordRef, setApiToken)
    }

    isValidEmailAddress(address) {
        try {
            if(address.includes('@') && address.includes('.')) {
                let atSplit = address.split('@')
                let prefix = atSplit[0] //can be anything
                let suffix = atSplit[1] //must include period
                if(prefix.length && suffix.length && suffix.includes('.')) {
                    let dotSplit = suffix.split('.')
                    //want indices 1 and 0 to contain at least 1 character each.
                    if(dotSplit[0].length && dotSplit[1].length) {
                        return true
                    }
                    return false
                }
                return false
            }
            else {
                return false
            }
        }
        catch(error) {
            console.log('E-mail validation error: ', error)
            return false
        }
    }

    isAuthenticated = () => {
        return this.authenticated
    }
}

export default new Auth();