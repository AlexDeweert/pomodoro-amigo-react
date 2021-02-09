export default class User {

    constructor(email=null,api_token=null,user_id=null,user_timers=[]) {
        this.email = email
        this.api_token = api_token
        this.user_id = user_id
        this.user_timers = user_timers
    }
    getEmail = () => this.email
    setEmail = (email) => this.email = email
    getApiToken = () => this.api_token //TODO: not really needed, but leave for now
    setApiToken = (api_token) => this.api_token = api_token
    getUserId = () => this.user_id
    setUserId = (user_id) => this.user_id = user_id
    getTimers = () => this.user_timers
    setTimers = (user_timers) => this.user_timers = user_timers
}