import React from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../../components/spinner/Spinner'

import './userInfos.scss'

const UserInfos = props => {

    const user = useSelector(state => state.users.user)
    const isLoading = useSelector(state => state.users.loading)

    console.log(user)

    return (
        <div className='container-userInfos'>
            {isLoading 
                ? <Spinner/>
                : 
                    <>
                        <h1>User infos</h1>
                        <div className='userInfos-card'>
                            <ul className='userInfos-list'>
                                <li>
                                    <div className='userInfos-card-field'>
                                        <p>Name</p> <h4>{user.name}</h4>
                                    </div>
                                </li>
                                <li>
                                    <div className='userInfos-card-field'>
                                        <p>Nickname</p> <h4>{user.nickname}</h4>
                                    </div>
                                </li>
                                <li>
                                    <div className='userInfos-card-field'>
                                    <   p>Email</p> <h4>{user.email}</h4>
                                    </div>
                                </li>
                                <li>
                                    <div className='userInfos-card-field'>
                                        <p>Level</p> <h4>{user.level}</h4>
                                    </div> 
                                </li>
                                <li>
                                    <div className='userInfos-card-field'>
                                        <p>Status</p> <h4>{user.status}</h4>
                                     </div>
                                </li>
                                <li>
                                    <div className='userInfos-card-field'>
                                        <p>Min bet</p> <h4>{user.min_bet}</h4>
                                    </div>
                                </li>
                                <li>
                                    <div className='userInfos-card-field'>
                                        <p>Max bet</p> <h4>{user.max_bet}</h4>
                                    </div>
                                </li>
                                <li>
                                    <div className='userInfos-card-field'>
                                        <p>Verification</p> <h4>{user.verification}</h4>
                                    </div>
                                </li>
                                <li>
                                    <div className='userInfos-card-field'>
                                        <p>Language</p> <h4>{user.language_id}</h4>
                                    </div>
                                </li>
                            </ul>
                           
                            
                            
                           
                            
                            
                            
                           
                            

                        </div>
                    </>
                    
            }
        </div>
    )
}

export default UserInfos