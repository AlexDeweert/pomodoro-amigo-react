import React, {useState} from 'react'
import Auth from './auth'

export default function Landing() {

    const [loggedIn, setLoggedIn] = useState(Auth.isAuthenticated())

    function handleLogout() {
        Auth.logout((success)=> {
            if(success) {
                //TODO: Trigger a toast here
                //We don't need to redirect with props.history.push('/')
                //because we're already here. Landing is at the '/' route
                console.log('Logged out')
                setLoggedIn(false)
            }
        })
    }

    return(
        <div>
            <h1>PomodoroAmigo</h1>
            <h2>Landing</h2>
            {loggedIn && <button  onClick={handleLogout}>Logout</button>}
        </div>
    )
}

// class Landing extends React.Component {
//     constructor(props) {
//         super(props)

//     }
// }