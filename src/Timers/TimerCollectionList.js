import React, { useContext, useRef, useState, useEffect } from 'react'
import {UserContext} from '../User/UserContext'
import TimerListItem from './TimerListItem'
import Auth from '../auth'
import { v4 as uuidv4 } from 'uuid';

export default function TimerCollectionList() {

    const [user] = useContext(UserContext)
    //Load the timerlist once on component load.
    //after that we edit locally, and async update the list remotely.
    const [timers, setTimers] = useState([])
    let [editing, setEditing] = useState(false)
    let [newTimerDescription, setNewTimerDescription] = useState(null)
    let descriptionRef = useRef()

    useEffect(()=>{
        console.log("Initial user load")
        setTimers(user.getTimers())
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
        // delete timers[timer_id]

        //Slightly inefficient - dicts make this faster but the tradeoff
        //is that we can't re-order dicts (for the up/down functionality)
        for(let i = 0; i < timers.length; i++) {
            let timer = timers[i]
            if(timer.timer_id === timer_id) {
                timers.splice(i, 1)
                break
            }
        }
        setTimers([...timers])
        //timerlist.pop()
        // setTimerDict(timerDict)
        Auth.deleteTimer(timer_id, (success)=>{
            if(success) {
                //TODO: Add toast here
                console.log("Successfully deleted timer with timer id %s",timer_id)
            }
        })
    }

    function promoteTimer(index) {
        /* We want to adjust the ranks of the existing timer list
        We don't resolve the rank in the database until after the user clicks "done".

        For now, we want to see if we can update the existing ranks of the timer dict
        make sure that the values are displayed properly (in sorted order)

        We loaded the timers ONCE into the user object after login.
        We can forget about that list for now and just use whatever is inside this components state (timerDict).
        Lets see if we can update the ordering of a dict: NOPE can't do it, at least easily.
        What if we maintain both a dict AND an array. The dict for quick referencing and deleting.
        */
       console.log("swap up with %s",index)
       if(index > 0) {
           let temp = timers[index-1]
           timers[index-1] = timers[index]
           timers[index] = temp
       }
       setTimers([...timers])
    }

    function demoteTimer(index) {
        console.log("swap down with %s",index)
       if(index < timers.length-1) {
           let temp = timers[index+1]
           timers[index+1] = timers[index]
           timers[index] = temp
       }
       setTimers([...timers])
    }

    //Make this asynchronous
    //TODO: The timers shouldn't be saved until the user clicks DONE
    //then we can call some kind of "resolve" function to update ranks, items, etc.
    function saveTimerToBackend() {
        let uuid = uuidv4()
        let newTimer = {
            timer_id: uuid,
            user_id: user.getUserId(),
            description: newTimerDescription,
            rank: timers.length
        }
        //user.getTimers().push(newTimer)
        timers.push(newTimer)
        // timerDict[uuid] = newTimer
        // setTimerDict({...timerDict})
        // setTimerDict(timerDict)

        //Here we wait for the assigned timer_id
        Auth.addNewTimer((success,timer_id)=>{
            if(success) {
                //TODO: Add toast here
                console.log("Successfully saved timer with timer_id %s",timer_id)
            }
        },user.getUserId(),uuid,newTimerDescription,timers.length)
    }

    //TODO: This function call should be added to a background queue of pending jobs
    //that is executed whenever a user saves their changes to an existing list.
    //We update their orders, and contents. The orders will depend on the state of the final list
    //state.
    
    //TODO: Timer ranks should only be updated if they change. We could have a "last" and "current" rank list
    //and just compare their values to see if they need to actually be updated.
    //It would need to be like {'timer_id':<id>, 'rank':<rank>} then we could do a shallow comparison
    //If we do saveTimerRanks, we set "last" to the updated list.
    //We only complete the update if "last" != "current"
    function saveTimerRanksToBackend() {
        //We need to send a rank, and a timer_id in the form { "<somerank>": {"timer_id": "<sometimerid>"} }
        //We also
        let timerData = {}
        for(let i = 0; i < timers.length; i++) {
            timerData[i.toString()] = {'timer_id':timers[i].timer_id}
        }
        Auth.updateTimerRanks(timerData, (success)=>{
            if(success) console.log('successfully updated timer ranks')
            else console.log('error updating timer ranks')
        })
    }

    function handleClickedEdit() {
        setEditing(true)
    }
    
    function handleClickedSave() {
        setEditing(false)
        descriptionRef.current.value = null
        setNewTimerDescription(null)
        saveTimerRanksToBackend()
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
                timers.length > 0 &&
                timers.map((timer, idx)=>{
                    return (
                        <TimerListItem rank={timer.rank} description={timer.description} user_id={timer.user_id} timer_id={timer.timer_id} key={timer.timer_id} index={idx} editing={editing} delete={deleteTimerListItem} promote={promoteTimer} demote={demoteTimer}/>
                    )
                })
            }
            {
                timers.length <= 0 &&
                <h3>No timers</h3>
            }
            {editing && <div><label>Description</label><input type="text" ref={descriptionRef} onChange={handleNewDescriptionChange}></input></div>}
            {editing && <button onClick={handleAddClicked}>Add</button>}
            {editing && <button onClick={handleClickedSave}>Done</button>}
            {!editing && <button onClick={handleClickedEdit}>Edit</button>}
        </div>
    )
}