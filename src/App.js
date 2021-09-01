import React, {useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {  useDispatch } from 'react-redux';
import { userLogged } from './store/userStore';
import Dashboard from './pages/Dashboard'
import Login from './pages/login/Login'
import Header from './components/header/Header'


function App() {

  const dispatch = useDispatch()
  const userToken = window.localStorage.getItem('token')
  
  if((userToken !== null)) {
    dispatch(userLogged(true))
  
  } else {
    dispatch(userLogged(false))
  }

 
  
 
  return (
    <Router>
      <Header/>
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path ='/dashboard' component={Dashboard}/>
      </Switch>
    </Router>
    
  );
}

export default App;
