import React from 'react'
import {Link} from 'react-router-dom'
import Auth from './auth'
import {useLocation} from 'react-router-dom'

export default function Navigation() {
    
    useLocation()
    
    function handleLogout() {
        Auth.logout((success)=>{
            if(success) {
                console.log("logged out")
            }
        })
    }

    return (
        <div className='nav'>
            <ul>
                <li><Link to='/home'>Timers</Link></li>
                {Auth.isAuthenticated() && <li><Link to='/auth' onClick={handleLogout}>Logout</Link></li>}
            </ul>
        </div>
    );
}