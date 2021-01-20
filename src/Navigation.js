import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import Auth from './auth'
import {useLocation} from 'react-router-dom'
import {toast} from 'react-toastify'
import {UserContext} from './UserContext'

export default function Navigation() {
    
    useLocation()
    let [, setUser] = useContext(UserContext)
    
    function handleLogout() {
        Auth.logout((success, toastMessage, toastId)=>{
            if(success) {
                toast.info(toastMessage, {toastId: toastId})
                setUser({
                    'email':null,
                    'api_token':null
                })
            }
        })
    }

    return (
        <div className='nav'>
            <ul>
            <li><Link exact='true' to='/'>PomodoroAmigo</Link></li>
                <li><Link to='/home'>Home</Link></li>
                <li><Link to='/collection'>Collection</Link></li>
                {Auth.isAuthenticated() && <li><Link to='/' onClick={handleLogout}>Logout</Link></li>}
            </ul>
        </div>
    );
}