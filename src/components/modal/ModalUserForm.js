import React,{useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserToDb, makeDeposit } from '../../store/userStore';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { isStringEmpty } from '../../helpers/checkFormat';

import './modal.scss'

const ModalUserForm = props => {

    const token = window.localStorage.getItem('token')

    const {depositForm} = props

    const user = useSelector(state => state.users.user)
    const [userState, setUserState] = useState(user)

    useEffect(() => {
        depositForm && setUserState({...userState, amount: 0, notes: ['new'], user_id : user.id})

    },[depositForm])


    const dispatch = useDispatch()

    const handleChange = e => {
        const {name, value} = e.target
        setUserState({...userState,[name]: value})
    }

    const handleSubmit = () => {

        if (!isStringEmpty(userState.name) && !isStringEmpty(userState.status) && !isStringEmpty(userState.status) && !isStringEmpty(userState.language_id)) {
            dispatch(updateUserToDb(userState, token))
            props.closeModal()
        }
    }

    const handleSubmitDeposit = () => {

        if (!isStringEmpty(userState.amount)) {
            dispatch(makeDeposit(userState, token))
            props.closeModal()
        }
    }


    return (
        <Dialog open={true}>
            <DialogTitle>{depositForm ? 'Deposit Money' : 'Edit user infos'}</DialogTitle>
            <DialogContent className='modalForm-wrap'>
                { depositForm 
                    ? 
                        <>
                            <TextField
                                className='modalForm-field'
                                label='Deposit'
                                type='number'
                                value={userState.amount}
                                onChange={(e)=> e.target.value > 0 && setUserState({...userState, amount: e.target.value})}
                            />
                        </>
                    :
                        <>
                            <TextField
                                className='modalForm-field'
                                label='Name'
                                name='name'
                                type='text'
                                value={userState.name}
                                onChange={(e)=> handleChange(e)}
                            />
                            <TextField
                                className='modalForm-field'
                                label='Status'
                                name='status'
                                type='text'
                                value={userState.status}
                                onChange={(e)=> handleChange(e)}
                            />
                            <TextField
                                className='modalForm-field'
                                label='Level'
                                name='level'
                                type='text'
                                value={userState.level}
                                onChange={(e)=> handleChange(e)}
                            />
                            <TextField
                                className='modalForm-field'
                                label='Lanuage'
                                name='language_id'
                                type='number'
                                value={userState.language_id}
                                onChange={(e)=> e.target.value >= 0 && handleChange(e)}
                            />
                                <>
                            <TextField
                                className='modalForm-field'
                                label='Min bet'
                                name='min_bet'
                                type='number'
                                value={userState.min_bet}
                                onChange={(e)=> e.target.value >= 0 && handleChange(e)}
                            />
                            <TextField
                                className='modalForm-field'
                                label='Max bet'
                                name='max_bet'
                                type='number'
                                value={userState.max_bet}
                                onChange={(e)=> e.target.value >= 0 && handleChange(e)}
                            />
                        </>
                        </>
                }
                
            </DialogContent>
            <DialogActions >
                <div className='modalForm-actions'>
                    <ClearIcon 
                        className='modalForm-actions-icon'  
                        onClick={() => props.closeModal()}
                    />
                    <div>
                        <Button 
                            className='modalForm-actions-btn'
                            onClick={() => setUserState(user)}
                        >
                            CANCEL
                        </Button>
                        <Button 
                            className='modalForm-actions-btn'
                            onClick={() => depositForm ? handleSubmitDeposit() : handleSubmit()}
                        >
                            OK
                        </Button>
                    </div>
                </div>
            </DialogActions>
        
      </Dialog>

    )
}

export default ModalUserForm;
