import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { TextField, Button } from '@material-ui/core'
import { loggUser } from '../../store/userStore'
import AlertMessage from '../../components/alert/Alert'

import './Login.scss'

const Login = () => {

    const dispatch = useDispatch()

    const errorLog = useSelector(state => state.users.errorLog)
    const isUserLogged = useSelector(state => state.users.isLogged)
    
    const initialState = {email:'raffihaycan@gmail.com', password: '!?p6]]tC%zH5f5ET'}
    const [user, setUser] = useState(initialState)
   
    const handleChange = event => {
        const {name, value} = event.target
        setUser({...user, [name]: value})
    }

    /* Once user is logged we redirect to Dashboard */
   if (isUserLogged) return <Redirect to='/dashboard'/>
   
    return (
        <div className='container-login'>
            <h1>Loggin</h1>
            <div className='loggin-input'>
                <TextField
                    label='Email'
                    name='email'
                    type='email'
                    value={user.email}
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div className='loggin-input'>
                <TextField
                    label='Password'
                    name='password'
                    type='password'
                    value={user.password}
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div className='loggin-button'>
                <Button 
                    className='button-primary' 
                    variant='contained'
                    color='primary'
                    onClick={() => dispatch(loggUser(user))}
                >
                OK
                </Button>
            </div>
            {errorLog && 
                <div style={{marginTop:'10px'}}>
                    <AlertMessage severity='error' text='Incorrect email or password'/>
                </div>
            }

        </div>
    )
}

export default Login