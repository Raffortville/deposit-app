import React from 'react'
import { useSelector , useDispatch} from 'react-redux'
import { useHistory } from "react-router-dom"
import { logOut } from '../../store/userStore'

import './header.scss'

const Header = () => {

    const dispatch = useDispatch()

    const isUserLogged = useSelector(state => state.users.isLogged)
    const history = useHistory()

    const handleLogOut = () => {
        const userToken = window.localStorage.getItem('token')
        dispatch(logOut(userToken))
    }

    return (
        <div className='header'>
           <h3 className='header-title'>Dashboard</h3> 
           {isUserLogged 
            ? <h3 className="header-cta" onClick={() => handleLogOut('/')}>Log out</h3>
            : <h3 className="header-cta" onClick={history.push('/')}>Log In</h3>
            }
        </div>
    )
}

export default Header