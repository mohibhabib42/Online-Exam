import React from 'react'
import {BrowserRouter as Router,Switch} from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'
import { Authprovider } from './contexts/Authprovider'
import PrivateRouter from "./Components/PrivateRoute"
import PrivateRouter2 from "./Components/PrivateRoute2"
import NewQuiz from "./Components/CreateQuiz"
import AppBar from './Components/Appbar'
import QuizList from './Components/QuizList'
import Homepage from "./Home"

function App() {
 
  return (
    
    <Router>
      <>
      <Authprovider>
        <Switch>
          <PrivateRouter2  path='/Login' component={Login} />
          <PrivateRouter2  path='/Register' component={Register} />
          <PrivateRouter path='/Home' component={Homepage} />
        </Switch>
        </Authprovider>
      </>    
    </Router> 
  );
}

export default App;
