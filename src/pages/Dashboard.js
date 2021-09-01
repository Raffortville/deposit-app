import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'


const Dashboard = () => {
    
    const isUserLogged = useSelector(state => state.users.isLogged)
    
    if (!isUserLogged) return <Redirect to='/'/>

    return(
        <div>Panel</div>
    )
}

export default Dashboard