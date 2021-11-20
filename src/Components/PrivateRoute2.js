import React from 'react'
import {Route,Redirect} from "react-router-dom"
import {useAuth} from "../contexts/Authprovider"

function PrivateRoute2({component:Component},...rest) {
    const {currentuser} =useAuth()

    return (
        <>
            <Route
            {...rest}
            render={props => {
              return  currentuser ? <Redirect to="/Home"/> :<Component {...props} />
            }}
            >

            </Route>   
        </>
    )
}

export default PrivateRoute2
