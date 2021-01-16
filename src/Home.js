import React from 'react'
import {withRouter} from 'react-router-dom'
import Auth from './auth'

//Had to use withRouter because the ProtectedRoute doesn't
//pass props down or something
class Home extends React.Component {
    constructor(props) {
        super(props)
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout() {
        Auth.logout((success)=> {
            if(success) {
                console.log('successfully logged out')
                this.props.history.push('/auth')
            }
        })
    }

    render() {
        return(
            <div>
                <h1>Interval Schema Name</h1>
                <h2>Intervals</h2>
                <button>Start</button> <button>Pause</button>
                <h2>[REPEAT CHECKBOX]</h2>
                <button>Save to Collection</button>
                <button>Edit</button>
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        )
    }
}

export default withRouter(Home)