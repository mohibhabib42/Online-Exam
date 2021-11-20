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
import Students from "./Components/StudentsList"
import Leadersboard from "./Components/Leadersboard"
import History from "./Components/History"

function Home() {
    return (
        <Router>
        <>
        <Authprovider>
        <AppBar/>
          <Switch>
            <PrivateRouter path='/Home' component={QuizList} />
            <PrivateRouter  path='/NewQuiz' component={NewQuiz} />
            <PrivateRouter path='/Students' component={Students} />
            <PrivateRouter path='/Ranking' component={Leadersboard} />
            <PrivateRouter path='/History' component={History} />
          </Switch>
          </Authprovider>
        </>    
      </Router> 
    );
}

export default Home
