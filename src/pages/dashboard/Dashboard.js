import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import TablePanel from '../../components/table/Table'
import { Redirect } from 'react-router-dom'
import Spinner from '../../components/spinner/Spinner'
import Pagination from '../../components/pagination/Pagination'

import './dashboard.scss'


const Dashboard = () => {

    const isUserLogged = useSelector(state => state.users.isLogged)
    const users = useSelector(state => state.users.users)
    const isLoading = useSelector(state => state.users.loading)

    const [currentPage, setCurrentPage] = useState(1)
    const usersPerPage = 3

    const indexOfLastPost = currentPage * usersPerPage;
    const indexOfFirstPost = indexOfLastPost - usersPerPage;
    const currentUsers = users.slice(indexOfFirstPost, indexOfLastPost)


    const paginate = pageNumber => setCurrentPage(pageNumber);

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