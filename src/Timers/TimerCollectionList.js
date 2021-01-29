import React, { useContext, useEffect, useRef, useState } from 'react'
import {UserContext} from '../User/UserContext'
import TimerListItem from './TimerListItem'
import Auth from '../auth'
import { v4 as uuidv4 } from 'uuid';

export default function TimerCollectionList(props) {


    //When do we need to retrieve the timers list?
    //On initial app load - ie if the current "savedTimers" state is null, then we can retrieve them in useEffect
    //For now, if we want to, we can store them locally - then asynchronously update the remote server

    let editing = props.editing
    let [user] = useContext(UserContext)
    const [unsavedTimers, setUnsavedTimers] = useState([])
    const [savedTimers, setSavedTimers] = useState([]) //gets these on app load
    const [addTimerDescription, setAddTimerDescription] = useState(null)
    let descriptionRef = useRef()

    //TODO take this new timers array list and update the DB with it.
    useEffect(()=> {
        //If savedTimers is empty this is the first time this component has loaded - ie its empty
        //so we must retrieve the items from the database
        
        // if(!savedTimers.length) {
        // }

        if(!editing && unsavedTimers.length) {
            console.log("Adding the following new timers: ")
            for(let i = 0; i < unsavedTimers.length; i++) {
                let savedTimerDescription = unsavedTimers[i].description
                //TODO Make an endpoint for bulk timer add rather than one at a time
                Auth.addNewTimer((success,timer_id)=>{
                    if(success) {
                        let newSavedTimer = {
                            user_id: user.getUserId(),
                            description: savedTimerDescription,
                            timer_id: timer_id,
                            id: uuidv4()
                        }
                        setSavedTimers([...savedTimers, newSavedTimer])
                    }
                },user.getUserId(),savedTimerDescription)
            }
            setUnsavedTimers([])
        }
    }, [editing,unsavedTimers,savedTimers,user])

    function handleNewDescriptionChange(e) {
        setAddTimerDescription(e.target.value)
    }

    function handleAddClicked() {
        if(addTimerDescription !== null && addTimerDescription.length) {
            let newTimer = {
                user_id: user.getUserId(),
                description: addTimerDescription,
                id: uuidv4()
            }
            setUnsavedTimers([...unsavedTimers, newTimer])
            descriptionRef.current.value = null
            setAddTimerDescription(null)
        }
    }

    return (
        <div>
            <h2>Timer list for {user.getApiToken()}</h2>
            {
                savedTimers.map((savedTimerItem)=>{
                    return (<TimerListItem description={savedTimerItem.description} user_id={savedTimerItem.user_id} timer_id={savedTimerItem.timer_id} key={savedTimerItem.id}/>)
                })
            }
            {
                // Display timer items that are just added but not yet saved
                editing &&
                unsavedTimers.map((unsavedTimerItem)=>{
                    return (<TimerListItem description={unsavedTimerItem.description} user_id={unsavedTimerItem.user_id} key={unsavedTimerItem.id}/>)
                })
            }
            {editing && <div><label>Description</label><input type="text" ref={descriptionRef} onChange={handleNewDescriptionChange}></input></div>}
            {editing && <button onClick={handleAddClicked}>Add</button>}
        </div>
    )
}