import axios from 'axios'

class Auth {
    constructor() {
        this.authenticated = false
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
                    callback(true, result.data['message'], 'auth-success-toast-id', email, result.data['token'], result.data['user_id'])
                }
            })
            .catch((error)=> {
                console.log(error)
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

    loginWithToken = (callback, apiToken) => {
        const config = {headers: {'Content-Type':'application/x-www-form-urlencoded'}}
        const params = new URLSearchParams()
        params.append('api_token', apiToken)
        const connString = process.env.REACT_APP_DB_STRING.concat('/login')
        axios.post(connString, params, config)
        .then((result)=>{
            if(result.status === 200) {
                this.authenticated = true;
                callback(true, result.data['message'], 'auth-success-toast-id', 'needEmailFromThisEndpoint', result.data['token'], result.data['user_id'])
            }
        })
        .catch((error)=>{
            this.authenticated = false
            callback(false, error.response.data['message'])
        })
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



    //Timers

    //TODO: Make this take an auth_token so we can have middleware auth checking on the backend
    addNewTimer = (callback, user_id, timer_id, description, rank) => {
        const config = { headers: {'Content-Type':'application/x-www-form-urlencoded'} }
        const params = new URLSearchParams()
        params.append('user_id', user_id)
        params.append('description', description)
        params.append('timer_id', timer_id)
        params.append('rank', rank)
        const connString = process.env.REACT_APP_DB_STRING.concat('/timers/add')
        axios.post(connString, params, config)
        .then((result)=>{
            if(result.status === 200) {
                console.log('Successful post of timer with id: %s',JSON.stringify(result.data))
                callback(true, result.data['timer_id'])
            }
        })
        .catch((error)=>{
            console.log(error)
            callback(false, error.response.data['message'])
        })
    }

    getTimers = (user_id, callback) => {
        const connString = process.env.REACT_APP_DB_STRING.concat('/timers/get')
        const params = {params: {user_id:user_id}}
        axios.get(connString, params)
        .then((response)=>{
            if(response.status === 200) {
                // console.log(response.data.result[0])
                // console.log(JSON.stringify(result.data))
                callback(true, response.data.result) //returns an array
            }
        })
        .catch((error)=>{
            console.log("error getting timers from server")
            console.log(error)
            callback(false, null)
        })
    }

    //TODO: This needs to be an authorized transaction
    deleteTimer = (timer_id, callback) => {
        const connString = process.env.REACT_APP_DB_STRING.concat('/timers/delete')
        axios.delete(connString, {data: {timer_id:timer_id}})
        .then((response)=>{
            if(response.status === 200) {
                callback(true)
            }
        })
        .catch((error)=>{
            console.log("error deleting timers from backend")
            console.log(error)
            callback(false)
        })
    }

    updateTimerRanks = (timerData, callback) => {
        const connString = process.env.REACT_APP_DB_STRING.concat('/timers/update-ranks')
        axios.put(connString, timerData)
        .then((response)=>{
            if(response.status === 200) {
                callback(true)
            }
        })
        .catch(()=>{
            callback(false)
        })
    }
}

export default new Auth();