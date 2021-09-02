import React from 'react'

import './pagination.scss'

const Pagination = props => {

    const {usersPerPage, totalUsers} = props

    const pageNumbers = []

    /* loop for page number count */
    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i)
    }

    return (            
        <div className='pagination'>
            {pageNumbers.map(number => (
                <div 
                    className='pagination'
                    key={number} 
                    onClick={() => props.paginate(number)}
                >
                    <div className='pagination-number'>
                        {number}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Pagination