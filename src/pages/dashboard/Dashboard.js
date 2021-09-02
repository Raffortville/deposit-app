import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import TablePanel from '../../components/table/Table'
import Spinner from '../../components/spinner/Spinner'
import Pagination from '../../components/pagination/Pagination'

import './dashboard.scss'


const Dashboard = () => {

    const isUserLogged = useSelector(state => state.users.isLogged)
    const users = useSelector(state => state.users.users)
    const isLoading = useSelector(state => state.users.loading)

    /* states for front pagination */
    const [currentPage, setCurrentPage] = useState(1)

    /* constants for front pagination */
    const usersPerPage = 3
    const indexOfLastPost = currentPage * usersPerPage;
    const indexOfFirstPost = indexOfLastPost - usersPerPage;
    const currentUsers = users.slice(indexOfFirstPost, indexOfLastPost)

    /* function for front pagination */
    const paginate = pageNumber => setCurrentPage(pageNumber)


    /* if user is not logged is pushed to login page (root) */
    if (!isUserLogged) return <Redirect to='/'/>

    return(
        <div className='container-dashboard'>
            {isLoading 
                ? <Spinner/>
                : <>
                    <h1>Users list</h1>
                    <TablePanel users={currentUsers}/>
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