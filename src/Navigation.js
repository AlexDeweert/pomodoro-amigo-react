import React from 'react'
import {Link} from 'react-router-dom'
import Auth from './auth'
import {useLocation} from 'react-router-dom'
import {toast} from 'react-toastify'

export default function Navigation() {
    
    useLocation()
    
    function handleLogout() {
        Auth.logout((success, toastMessage, toastId)=>{
            if(success) {
                toast.info(toastMessage, {toastId: toastId})
            }
        })
    }

    return (
        <div className='nav'>
            <ul>
            <li><Link exact='true' to='/'>PomodoroAmigo</Link></li>
                <li><Link to='/home'>Timers</Link></li>
                {Auth.isAuthenticated() && <li><Link to='/' onClick={handleLogout}>Logout</Link></li>}
            </ul>
        </div>
    );
}