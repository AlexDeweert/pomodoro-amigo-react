import React from 'react'

export default function TimerListItem(props) {
    return (
        <div>
            desc: {props.description}, user_id: {props.user_id}, timer_id: {props.timer_id || "null timer id"}
        </div>
    )
}