import React from 'react'

import './pagination.scss'

const Pagination = props => {

    const {usersPerPage, totalUsers} = props

    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i);
    }


    return (
        <div>
            <nav>
                <ul className='pagination'>
                    {pageNumbers.map(number => (
                        <div 
                            className='pagination'
                            key={number} 
                            onClick={() => props.paginate(number)}
                        >
                            <div className='pagination-number'>{number}</div>
                        </div>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default Pagination