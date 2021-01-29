import React from 'react'
import TimerCollectionList from './TimerCollectionList'
import {withRouter} from 'react-router-dom'
import Auth from '../auth'

class TimerCollection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {editing: false, saved: false}
        this.handleClickedEdit = this.handleClickedEdit.bind(this)
        this.handleClickedSave = this.handleClickedSave.bind(this)
    }

    handleClickedEdit() {
        this.setState({editing: true})
        console.log('is Authed => ', Auth.isAuthenticated())
    }
    
    handleClickedSave() {
        this.setState({editing: false})
    }

    render() {
        if(this.state.editing) {
            return(
                <div>
                    <h1>Collection</h1>
                    <TimerCollectionList editing={this.state.editing} />
                    <button onClick={this.handleClickedSave}>Save</button>
                </div>
            )
        }
        else {
            return (
                <div>
                    <h1>Collection</h1>
                    <TimerCollectionList editing={this.state.editing} />
                    <button onClick={this.handleClickedEdit}>Edit</button>
                </div>
            )
        }
        
    }
}

export default withRouter(TimerCollection)