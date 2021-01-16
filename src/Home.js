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
                <h1>PomodoroAmigo</h1>
                <h2>Home</h2>
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        )
    }
}

export default withRouter(Home)