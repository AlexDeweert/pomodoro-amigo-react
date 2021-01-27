import React from 'react'
import TimerCollectionList from './TimerCollectionList'
import {withRouter} from 'react-router-dom'
import Auth from '../auth'

class TimerCollection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {editing: false}
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
        return(
            <div>
                <h1>Collection</h1>
                <TimerCollectionList editing={this.state.editing} />
                {!this.state.editing && <button onClick={this.handleClickedEdit}>Edit</button>}
                {this.state.editing && <button onClick={this.handleClickedSave}>Save</button>}
            </div>
        )
    }
}

export default withRouter(TimerCollection)