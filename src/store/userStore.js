import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    users : [],
    user : {},
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
        setLoading : (state, {payload}) => {state.loading = payload}
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
            window.localStorage.setItem('token', data.data.token)

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
        }

        dispatch(setLoading(false))
        
    } catch (error) {
        console.log(error)
    }
}

export const { getUsers, setUser, userLogged, setErrorLog, setLoading} = usersSlice.actions


export default usersSlice.reducer




