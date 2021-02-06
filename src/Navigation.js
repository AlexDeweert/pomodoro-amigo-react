import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import Auth from './auth'
import {useLocation} from 'react-router-dom'
import {toast} from 'react-toastify'
import {UserContext} from './User/UserContext'

export default function Navigation() {
    
    useLocation()
    let [user] = useContext(UserContext)
    
    function handleLogout() {
        Auth.logout((success, toastMessage, toastId)=>{
            if(success) {
                toast.info(toastMessage, {toastId: toastId})
                user.setEmail(null)
                user.setApiToken(null)
                user.setUserId(null)
                user.setTimers({})
            }
        })
    }

    return (
        <div className='nav'>
            <ul>
                <li><Link exact='true' to='/'>PomodoroAmigo</Link></li>
                <li><Link to='/home'>Home</Link></li>
                <li><Link to='/collection'>Collection</Link></li>
                <li><Link to='/auth'>Auth</Link></li>
                {Auth.isAuthenticated() && <li><Link to='/' onClick={handleLogout}>Logout</Link></li>}
            </ul>
        </div>
    );
}