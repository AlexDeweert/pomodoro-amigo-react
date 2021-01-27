export default class User {

    constructor(email=null,api_token=null) {
        this.email = email
        this.api_token = api_token
    }
    getEmail = () => this.email
    setEmail = (email) => this.email = email
    getApiToken = () => this.api_token
    setApiToken = (api_token) => this.api_token = api_token
}