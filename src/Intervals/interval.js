export default class Interval {
    constructor(description=null, interval_id=null, timer_id=null) {
        this.description = description
        this.interval_id = interval_id
        this.timer_id = timer_id
    }
    
    getDescription = () => this.description
    setDescription = (newDescription) => this.description = newDescription
    
    getIntervalId = () => this.interval_id
    setIntervalId = (newIntervalId) => this.interval_id = newIntervalId
    
    getTimerId = () => this.timer_id
    setTimerId = (newTimerId) => this.timer_id = newTimerId
}