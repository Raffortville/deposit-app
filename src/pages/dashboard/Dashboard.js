import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { getUsers } from '../../store/userStore'
import TablePanel from '../../components/table/Table'
import Spinner from '../../components/spinner/Spinner'
import Pagination from '../../components/pagination/Pagination'

import './dashboard.scss'


const Dashboard = () => {

    /* bool for checkeing filter order */
    const [ascending, setAscending] = useState(false)
    const [currentUsers, setCurrentUsers] = useState([])

    const isUserLogged = useSelector(state => state.users.isLogged)
    const users = useSelector(state => state.users.users)
    const isLoading = useSelector(state => state.users.loading)

    /* states for front pagination */
    const [currentPage, setCurrentPage] = useState(1)


    /* constants for front pagination */
    const usersPerPage = 3
    const indexOfLastPost = currentPage * usersPerPage;
    const indexOfFirstPost = indexOfLastPost - usersPerPage;

    useEffect(() => {
        let usersCopy = users.slice(indexOfFirstPost, indexOfLastPost)
        setCurrentUsers(usersCopy)

    }, [indexOfFirstPost, indexOfLastPost, users])
    
    /* function for front pagination */
    const paginate = pageNumber => setCurrentPage(pageNumber)


    /* if user is not logged is pushed to login page (root) */
    if (!isUserLogged) return <Redirect to='/'/>


    /* function for current users array filtering */
    const sortArray = filter => {

        let usersCopy = [...currentUsers]

        usersCopy.sort((a, b) =>  {
            if (!ascending)  {
                setAscending(true)
                return a[filter] > b[filter]
            }
            else {
                setAscending(false)
                return a[filter] < b[filter]
            }
        })

        setCurrentUsers(usersCopy)
    }

    return(
        <div className='container-dashboard'>
            {isLoading 
                ? <Spinner/>
                : <>
                    <h1>Users list</h1>
                    <TablePanel users={currentUsers} sortArray={sortArray}/>
                    <div>
                        <Pagination 
                            paginate={paginate}
                            totalUsers={users.length}
                            usersPerPage={usersPerPage}
                        />
                    </div>
                </>
            }
            
        </div>
    )
}

export default Dashboard