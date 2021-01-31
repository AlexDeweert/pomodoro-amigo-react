import React, { useContext, useRef, useState } from 'react'
import {UserContext} from '../User/UserContext'
import TimerListItem from './TimerListItem'
import Auth from '../auth'
import { v4 as uuidv4 } from 'uuid';

export default function TimerCollectionList() {


    //When do we need to retrieve the timers list?
    //On initial app load - ie if the current "savedTimers" state is null, then we can retrieve them in useEffect
    //For now, if we want to, we can store them locally - then asynchronously update the remote server

    const [user] = useContext(UserContext)
    // let [timers] = useState(user.getTimers())
    let [editing, setEditing] = useState(false)
    let [newTimerDescription, setNewTimerDescription] = useState(null)
    let descriptionRef = useRef()

    //TODO: Use caching here so we only retrieve the pre-existing timers once
    //when the component is first loaded.
    // useEffect(()=>{
    //     Auth.getTimers(user.getUserId(), (success, timerData)=> {
    //         if(success && timerData.length) {
    //             let newTimers = []
    //             for(let idx in timerData) {
    //                 let timer = timerData[idx]
    //                 console.log(timer)
    //                 let newTimer = {
    //                     timer_id: timer.timer_id,
    //                     user_id: timer.user_id,
    //                     description: timer.description
    //                 }
    //                 newTimers.push(newTimer)
    //             }
    //             setTimers(newTimers)
    //         }
    //     })
    // }, [user])

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

    //Make this asynchronous
    function saveTimerToBackend() {
        let uuid = uuidv4()
        let newTimer = {
            timer_id: uuid,
            user_id: user.getUserId(),
            description: newTimerDescription,
        }
        //setTimers([...timers, newTimer])
        // user.setTimers([...timers, newTimer])
        user.getTimers().push(newTimer)

        //Here we wait for the assigned timer_id
        Auth.addNewTimer((success,timer_id)=>{
            if(success) {
                console.log("Successfully saved timer with timer_id %s",timer_id)
            }
        },user.getUserId(),uuid,newTimerDescription)
    }

    function handleClickedEdit() {
        setEditing(true)
    }
    
    function handleClickedDone() {
        setEditing(false)
        descriptionRef.current.value = null
        setNewTimerDescription(null)
    }

    return (
        <div>
            <h2>Timer Collection for {user.getApiToken()}</h2>
            {
                user.getTimers().map((timer)=>{
                    return (<TimerListItem description={timer.description} user_id={timer.user_id} timer_id={timer.timer_id} key={timer.timer_id}/>)
                })
                // timers.map((timer)=>{
                //     return (<TimerListItem description={timer.description} user_id={timer.user_id} timer_id={timer.timer_id} key={timer.timer_id}/>)
                // })
            }
            {editing && <div><label>Description</label><input type="text" ref={descriptionRef} onChange={handleNewDescriptionChange}></input></div>}
            {editing && <button onClick={handleAddClicked}>Add</button>}
            {editing && <button onClick={handleClickedDone}>Done</button>}
            {!editing && <button onClick={handleClickedEdit}>Edit</button>}
        </div>
    )
}