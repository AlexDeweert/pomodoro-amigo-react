import React, { useContext, useRef, useState, useEffect } from 'react'
import {UserContext} from '../User/UserContext'
import TimerListItem from './TimerListItem'
import Auth from '../auth'
import { v4 as uuidv4 } from 'uuid';

export default function TimerCollectionList() {

    const [user] = useContext(UserContext)
    //Load the timerlist once on component load.
    //after that we edit locally, and async update the list remotely.
    const [timerDict, setTimerDict] = useState({})
    let [editing, setEditing] = useState(false)
    let [newTimerDescription, setNewTimerDescription] = useState(null)
    let descriptionRef = useRef()

    useEffect(()=>{
        console.log("Initial user load")
        setTimerDict(user.getTimers())
    }, [user])

    function handleNewDescriptionChange(e) {
        setNewTimerDescription(e.target.value)
    }

    function handleAddClicked() {
        if(newTimerDescription !== null && newTimerDescription.length) {
            saveTimerToBackend()
            descriptionRef.current.value = null
            setNewTimerDescription(null)
        }
    }

    //a function passed as a prop to each timer list item instance
    function deleteTimerListItem(timer_id) {
        console.log("deleteTimerListItem %s", timer_id)
        //user.getTimers().pop()
        delete timerDict[timer_id]
        setTimerDict({...timerDict})
        //timerlist.pop()
        // setTimerDict(timerDict)
        Auth.deleteTimer(timer_id, (success)=>{
            if(success) {
                //TODO: Add toast here
                console.log("Successfully deleted timer with timer id %s",timer_id)
            }
        })
    }

    //Make this asynchronous
    function saveTimerToBackend() {
        let uuid = uuidv4()
        let newTimer = {
            timer_id: uuid,
            user_id: user.getUserId(),
            description: newTimerDescription,
        }
        //user.getTimers().push(newTimer)
        //timerlist.push(newTimer)
        timerDict[uuid] = newTimer
        setTimerDict({...timerDict})
        // setTimerDict(timerDict)

        //Here we wait for the assigned timer_id
        Auth.addNewTimer((success,timer_id)=>{
            if(success) {
                //TODO: Add toast here
                console.log("Successfully saved timer with timer_id %s",timer_id)
            }
        },user.getUserId(),uuid,newTimerDescription,Object.keys(timerDict).length)
    }

    function handleClickedEdit() {
        setEditing(true)
    }
    
    function handleClickedDone() {
        setEditing(false)
        descriptionRef.current.value = null
        setNewTimerDescription(null)
    }

    // edit, updown, delete
    //edit is changing the description of a timer with a specific id
    //updown is changing the order in the list - which is an array so we can just do a swap
    //delete is removing an item from the array with a specific key/index
    //it would seem that all of these things can be done from the timer list item
    //each timer list item should handle its own edit, update, delete functions.

    /* THe list items will be loaded in with a saved rank value, on initial load
    that's the data we use to sort the users timer list.

    Thereafter, we can move the items up and down, and delete those items.
    This effectively changes their rank. At the end of an "edit" (deleting, moving up and down)
    we can "resolveRank" by setting the rank values of each list item to their relative position
    in the list.

    Then what we do is update the database with the new rank of the list item.

    Delete should be working and updating first though.
    */
    return (
        <div>
            <h2>for {user.getApiToken()}</h2>
            {
                Object.keys(timerDict).length > 0 &&
                Object.entries(timerDict).map(([timer_id,timer])=>{
                    return (
                        <TimerListItem rank={timer.rank} description={timer.description} user_id={timer.user_id} timer_id={timer.timer_id} key={timer_id} editing={editing}  delete={deleteTimerListItem}/>
                    )
                })
            }
            {
                Object.keys(timerDict).length <= 0 &&
                <h3>No timers</h3>
            }
            {editing && <div><label>Description</label><input type="text" ref={descriptionRef} onChange={handleNewDescriptionChange}></input></div>}
            {editing && <button onClick={handleAddClicked}>Add</button>}
            {editing && <button onClick={handleClickedDone}>Done</button>}
            {!editing && <button onClick={handleClickedEdit}>Edit</button>}
        </div>
    )
}