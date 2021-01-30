import React from 'react'
import TimerCollectionList from './TimerCollectionList'
import {withRouter} from 'react-router-dom'

class TimerCollection extends React.Component {
    render() {return <TimerCollectionList/>}
}

export default withRouter(TimerCollection)