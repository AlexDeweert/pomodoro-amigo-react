import React from 'react'
// import {UserContext} from '../User/UserContext'

export default function TimerListItem(props) {
    // const [user] = useContext(UserContext)

    // function handleUpArrowPressed() {
    //     console.log("upArrowPressed")
    //     if(props.index > 0) {
    //         // let timers = user.getTimers()
    //         // let above = user.getTimers()[props.index-1]
    //         // timers[props.index-1] = timers[props.index]
    //         // timers[props.index] = above
    //         user.setTimers([])
    //     }
    // }

    return (
        <div>
            rank: {props.rank}, esc: {props.description}, user_id: {props.user_id}, timer_id: {props.timer_id || "null timer id"}
            {props.editing && <button onClick={()=> {props.delete(props.timer_id)}}>D</button>}
            {props.editing && <button onClick={()=> {props.promote(props.index)}}>Up</button>}
            {props.editing && <button onClick={()=> {props.demote(props.index)}}>Dwn</button>}
            {/* {props.editing && <button>E</button>}
            {props.editing && <button onClick={handleUpArrowPressed}>Up</button>}
            {props.editing && <button>Dn</button>}
            {props.editing && <button>D</button>} */}
        </div>
    )
}