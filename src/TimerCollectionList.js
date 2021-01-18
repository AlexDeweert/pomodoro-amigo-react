import React from 'react'

export default function TimerCollectionList(props) {

    let editing = props.editing

    return(
        <div>
            <h3>Timer list item 1 {!editing && <button>Go</button>} {editing && <button>P</button>} {editing && <button>UD</button>} {editing && <button>D</button>} </h3>
            <h3>Timer list item 2 {!editing && <button>Go</button>} {editing && <button>P</button>} {editing && <button>UD</button>} {editing && <button>D</button>} </h3>
            <h3>Timer list item 3 {!editing && <button>Go</button>} {editing && <button>P</button>} {editing && <button>UD</button>} {editing && <button>D</button>} </h3>
            <h3>Timer list item 4 {!editing && <button>Go</button>} {editing && <button>P</button>} {editing && <button>UD</button>} {editing && <button>D</button>} </h3>
            <h3>...</h3>
        </div>
    )
}