export default class Timer {
    constructor(description=null, timer_id=null) {
        this.description = description
        this.timer_id = timer_id
    }
    getDescription = () => this.description
    setDescription = (newDescription) => this.description = newDescription
    getTimerId = () => this.timer_id
    setTimerId = (newTimerId) => this.timer_id = newTimerId
}