import React from 'react'
import {Route,Redirect} from "react-router-dom"
import {useAuth} from "../contexts/Authprovider"


function PrivateRoute({component: Component,...rest}) {
    
    const {currentuser} =useAuth()

    return (
        <>
            <Route
            {...rest}
            render={props => {
              return  currentuser ? <Component {...props} /> : <Redirect to="/Login"/>
            }}
            >

            </Route>   
        </>
    )
}

export default PrivateRoute
