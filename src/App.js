import React, {useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {  useDispatch } from 'react-redux';
import { userLogged, fetchUsers } from './store/userStore';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login'
import Header from './components/header/Header'
import UserInfos from './pages/user/UserInfos';


const App = () => {

  const dispatch = useDispatch()
  const userToken = window.localStorage.getItem('token')

  /* in refresh case we grab token from localStorage to check user logged status*/
  useEffect(() => {
    if((userToken !== null)) {
      dispatch(userLogged(true))
      dispatch(fetchUsers(userToken))
    
    } else {
      dispatch(userLogged(false)) 
    }

  },[userToken, dispatch])
  

  return (
    <Router>
      <Header/>
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path ='/dashboard' component={Dashboard}/>
        <Route path ='/infos/:userId' component={UserInfos}/>
      </Switch>
    </Router>
    
  );
}

export default App;
