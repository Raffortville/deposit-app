import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserById, setUser } from '../../store/userStore';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Tooltip } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import ModalInfos from '../modal/ModalInfos';

import './table.scss'

const useStyles = makeStyles({
  table: {
    width: 950,
    height: 250,
  },
});


const  TablePanel = props =>  {

  const classes = useStyles();
  const history = useHistory()

  const {users }= props

  const userToken = window.localStorage.getItem('token')

  const dispatch = useDispatch()

  const [openModal, setOpenModal] = useState(false)

  console.log(users)

  return (

    <>
      
    <TableContainer style={{width:'950px',marginTop:'30px'}}component={Paper}>
      <Table  className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Nickname</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Level</TableCell>
            <TableCell align="center">Min bet</TableCell>
            <TableCell align="center">Max bet</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell align="right">{user.nickname}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.status}</TableCell>
              <TableCell align="right">{user.level}</TableCell>
              <TableCell align="right">{user.min_bet}</TableCell>
              <TableCell align="right">{user.max_bet}</TableCell>
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
                  <Tooltip title='See users infos'>
                    <EditIcon 
                      className='table-icon' 
                      onClick={() => {
                        dispatch(setUser(user))
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
      {openModal && <ModalInfos closeModal={()=> setOpenModal(false)}/>}
    </>
   
  );
}


export default TablePanel