export default class User {

    constructor(email=null,api_token=null,user_id=null) {
        this.email = email
        this.api_token = api_token
        this.user_id = user_id
    }
    getEmail = () => this.email
    setEmail = (email) => this.email = email
    getApiToken = () => this.api_token
    setApiToken = (api_token) => this.api_token = api_token
    getUserId = () => this.user_id
    setUserId = (user_id) => this.user_id = user_id
}