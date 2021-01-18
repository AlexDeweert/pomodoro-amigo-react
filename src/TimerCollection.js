import React, {useState} from 'react'
import TimerCollectionList from './TimerCollectionList'

export default function TimerCollection(props) {

    //default to not editing the page
    let [editing, setEditing] = useState(false)

    function handleClickedEdit() {
        setEditing(true)
    }
    
    function handleClickedSave() {
        setEditing(false)
    }

    return(
        <div>
            <h1>Collection</h1>
            <TimerCollectionList editing={editing} />
            {!editing && <button onClick={handleClickedEdit}>Edit</button>}
            {editing && <button onClick={handleClickedSave}>Save</button>}
        </div>
    )
}