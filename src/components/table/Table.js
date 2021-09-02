import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip} from '@material-ui/core/'
import VisibilityIcon from '@material-ui/icons/Visibility'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import EditIcon from '@material-ui/icons/Edit'

import ModalUserForm from '../modal/ModalUserForm'
import { fetchUserById, setUser } from '../../store/userStore'

import './table.scss'


const  TablePanel = props =>  {

  const history = useHistory()
  const dispatch = useDispatch()

  const {users} = props

  const userToken = window.localStorage.getItem('token')

  
  const [openModal, setOpenModal] = useState(false)
  const [depositForm, setDepositForm] = useState(false)


  return (

    <>
      <TableContainer className='table-container' component={Paper}>
        <Table  className='table'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Nickname</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Level</TableCell>
              <TableCell align="center">Min bet</TableCell>
              <TableCell align="center">Max bet</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row"> {user.name}</TableCell>
                <TableCell align="right">{user.nickname}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.status}</TableCell>
                <TableCell align="right">{user.level}</TableCell>
                <TableCell align="right">{user.min_bet}</TableCell>
                <TableCell align="right">{user.max_bet}</TableCell>
                <TableCell align="right">{user?.amount ? user.amount : '0'}</TableCell>
                <TableCell align="right">
                  <div className='table-actions'>

                    <Tooltip title='See users infos'>
                      <VisibilityIcon 
                        className='table-icon' 
                        onClick={() => {
                          dispatch(fetchUserById(userToken, user.id))
                          history.push(`/infos/${user.id}`)
                        }}
                      />
                    </Tooltip>

                    <Tooltip title='Edit users infos'>
                      <EditIcon 
                        className='table-icon' 
                        onClick={() => {
                          dispatch(setUser(user))
                          setDepositForm(false)
                          setOpenModal(true)
                        }}
                      />
                    </Tooltip>

                    <Tooltip title='Deposit money'>
                      <MonetizationOnIcon
                        className='table-icon' 
                        onClick={() => {
                          dispatch(setUser(user))
                          setDepositForm(true)
                          setOpenModal(true)
                        }}
                      />
                    </Tooltip>

                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {openModal && <ModalUserForm closeModal={()=> setOpenModal(false)} depositForm={depositForm}/>}
    </>
  )
}


export default TablePanel