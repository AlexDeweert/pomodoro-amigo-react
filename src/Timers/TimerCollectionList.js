import React, { useContext, useEffect, useRef, useState } from 'react'
import {UserContext} from '../User/UserContext'
import TimerListItem from './TimerListItem'
import Auth from '../auth'

export default function TimerCollectionList(props) {

    let editing = props.editing
    let [user] = useContext(UserContext)
    const [timersArray, setTimersArray] = useState([])
    let newDescription = null
    let descriptionRef = useRef()

    //TODO take this new timers array list and update the DB with it.
    useEffect(()=> {
        if(!editing && timersArray.length) {
            console.log("Adding the following new timers: ")
            for(let i = 0; i < timersArray.length; i++) {
                console.log(JSON.stringify(timersArray[i]))
            }
            setTimersArray([])
        }
    }, [editing,timersArray])

    function handleNewDescriptionChange(e) {
        newDescription = e.target.value
    }

    function handleAddClicked() {
        if(newDescription !== null && newDescription.length) {
            let newTimer = {
                userId: user.getUserId(),
                description: newDescription
            }
            setTimersArray([...timersArray, newTimer])
            descriptionRef.current.value = null
            newDescription = null
        }
    }

    return (
        <div>
            <h2>Timer list for {user.getApiToken()}</h2>
            <h3><TimerListItem description="blah"></TimerListItem><button>P</button><button>UD</button><button>D</button></h3>
            {editing && <div><label>Description</label><input type="text" ref={descriptionRef} onChange={handleNewDescriptionChange}></input></div>}
            {editing && <button onClick={handleAddClicked}>Add</button>}
        </div>
    )
}