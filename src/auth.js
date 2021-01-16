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
    login = (callback) => {this.authenticated = true; callback()}
    
    logout = (callback) => {
        this.authenticated = false;
        localStorage.removeItem('apiToken')
        callback(true)
    }
    
    register = (callback, emailRef, passwordRef, setApiToken) => {
        const config = { headers: {'Content-Type':'application/x-www-form-urlencoded'} }
        const params = new URLSearchParams()
        params.append('email',emailRef.current.value)
        params.append('password',passwordRef.current.value)
        const connString = process.env.REACT_APP_DB_STRING.concat('/register')
        axios.post(connString, params, config)
        .then((result)=> {
            if(result.data['success']) {
                setApiToken(result.data['token'])
                this.authenticated = true;
                callback(true)
            }
            else {
                callback(false)
            }
        })
        .catch((err)=> {
            this.authenticated = false
            callback(false)
            console.log('error on registration => ', err)
        })
        emailRef.current.value = null
        passwordRef.current.value = null
    }

    isAuthenticated = () => {
        return this.authenticated
    }
}

export default new Auth();