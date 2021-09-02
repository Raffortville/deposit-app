import { createSlice } from "@reduxjs/toolkit"
import { checkResponseStatus } from "../helpers/checkResponseStatus"

const initialState = {
    users : [],
    user : {},
    userAdmin : {},
    isLogged : false,
    errorLog : false,
    loading : false,

}

const usersSlice = createSlice({
    name : 'USERS',
    initialState,
    reducers : {
        getUsers:(state, {payload}) => {state.users = payload},
        setUser: (state, {payload}) => {state.user = payload },
        userLogged: (state, {payload}) => {state.isLogged = payload},
        setErrorLog: (state, {payload}) => {state.errorLog = payload},
        setLoading : (state, {payload}) => {state.loading = payload},
        setUserAdmin : (state, {payload}) => {state.userAdmin = payload},
        updateUsers : (state, {payload}) => {state.users = state.users.map(user => user.id === payload.id ? {...user, ...payload}: user)},
    }
})


export const loggUser = (payload) => async dispatch => {
    try {

        const response = await fetch('/login', {
            method:'POST',
            headers : {
                'Accept':' application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(payload) 
        })

        if (response.status === 200) {
            const data = await response.json()
            dispatch(userLogged(true))
            dispatch(setUserAdmin(payload))
            window.localStorage.setItem('token', data.data.token)
            dispatch(fetchUsers(data.data.token))

        } else {
            dispatch(setErrorLog(true))
            setTimeout(() => { dispatch(setErrorLog(false))}, 3000);
        }
        
    } catch (error) {
        console.log(error)
    }
}

export const logOut = (payload) => async dispatch => {
   
    try {
        const response = await fetch('/logout', {
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
                'Authorization':  `Bearer ${payload}` 
            }
        })

        if (response.status === 200) {
            window.localStorage.removeItem('token')
            dispatch(userLogged(false))
            dispatch(setUserAdmin({}))
        }

    } catch (error) {
        console.log(error)
    }
}

export const fetchUsers = payload => async dispatch => {

    dispatch(setLoading(true))

    try {
        const response = await fetch('/users', {
            method :'GET',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
                'Authorization':  `Bearer ${payload}` 
            }
        })

        if (response.status === 200) {
            const data = await response.json()
            dispatch(getUsers(data.data.items)) 

        } else if (response.status === 401) {
            window.localStorage.removeItem('token')
            dispatch(userLogged(false))
        }

        dispatch(setLoading(false))

    } catch (error) {
        console.log(error)
    }
}

export const fetchUserById = (payload, userId) => async dispatch => {

    dispatch(setLoading(true))

    try {
        const response = await fetch(`/users/view/${userId}`, {
            method: 'GET',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
                'Authorization':  `Bearer ${payload}` 
            }
        })

        if (response.status === 200) {
            const data = await response.json()
            dispatch(setUser(data.data.User))

        } else if (response.status === 401) {
            window.localStorage.removeItem('token')
            dispatch(userLogged(false))
        }


        dispatch(setLoading(false))
        
    } catch (error) {
        console.log(error)
    }
   
}

export const updateUserToDb = (payload, token) => async dispatch => {

    try {
        const response = await fetch(`/users/update/${payload.id}`, {
            method : 'PUT',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
                'Authorization':  `Bearer ${token}` ,
                'origin' : 'http://localhost:3000/',
                'referer' : 'http://localhost:3000/'
            },
            body : JSON.stringify(payload)
        })

        if (checkResponseStatus(response.status) === 'success') {
            const data = await response.json()
            dispatch(setUser(data.data.User))
            dispatch(updateUsers(data.data.User))

        } else if (checkResponseStatus(response.status) === 'error authorization') {
            window.localStorage.removeItem('token')
            dispatch(userLogged(false))
        }
        
    } catch (error) {
        console.log(error)
    }
}

export const makeDeposit = (payload, token) => async dispatch => {

    const deposit = {amount: payload.amount, notes: payload.notes, user_id: payload.user_id}

    try {
        const response = await fetch('/deposits/store', {
            method : 'POST',
            headers: {
                'authority' : 'http://localhost:3000/',
                'accept':'application/json',
                'content-Type': 'application/json',
                'authorization':  `Bearer ${token}` ,
                'origin' : 'http://localhost:3000/',
                'referer' : 'http://localhost:3000/'
            },
            body : JSON.stringify(deposit)
        })


       if (checkResponseStatus(response.status) === 'success') {
            dispatch(setUser(payload))
            dispatch(updateUsers(payload))

        } else if (checkResponseStatus(response.status) === 'error authorization') {
            window.localStorage.removeItem('token')
            dispatch(userLogged(false))
        }
            
    } catch (error) {
        console.log(error)
    }
}

export const { getUsers, setUser, userLogged, setErrorLog, setLoading, setUserAdmin, updateUsers} = usersSlice.actions


export default usersSlice.reducer




