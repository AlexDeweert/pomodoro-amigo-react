import React from 'react'

export default function Landing(props) {

    function handleClickedFocus() {
        props.history.push('/home')
    }

    return(
        <div>
            <h1>PomodoroAmigo</h1>
            <h2>Focus on tasks efficiently</h2>
            <h2>Make effective use of your brain power</h2>
            <button onClick={handleClickedFocus}>Focus</button>
        </div>
    )
}

// class Landing extends React.Component {
//     constructor(props) {
//         super(props)

//     }
// }