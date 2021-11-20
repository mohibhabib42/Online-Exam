import React,{useState,useEffect} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import { useAuth } from "../contexts/Authprovider"
import {useHistory,NavLink} from 'react-router-dom'


function Appbar(active) {
    const {logout} =useAuth()
    const [isadmin, setisadmin] = useState(true)
    useEffect(() => {
        if(currentuser.email !== "mohib.habib42@gmail.com"){
            setisadmin(false);
          }
    }, )
    const {currentuser}=useAuth()
    const history=useHistory()
    async function handlelogout(){
        try{
            await logout()
            history.push("/Login")
        }
        catch{
            alert('error')
        }
        }
        const style={textDecoration:"none",color:"white"};
    return (
        <React.Fragment>
             <Navbar bg="dark" variant="dark">
                <Navbar.Brand><NavLink to="/" style={style}>Online Exam</NavLink></Navbar.Brand>
                <Nav className="mr-auto">
                    <NavLink activeStyle={{borderBottom:"1px solid white"}} className="align-self-xl-center m-2" to="/Home" style={style}>Home</NavLink>
                    {isadmin
                    ?
                    <NavLink activeStyle={{borderBottom:"1px solid white"}} className="align-self-xl-center m-2" to="/Students" style={style}>Students</NavLink>
                    :
                    <></>
                    }
                    <NavLink activeStyle={{borderBottom:"1px solid white"}} className="align-self-xl-center m-2" to="/Ranking" style={style}>Ranking</NavLink>
                    {!isadmin
                    ?
                    <NavLink activeStyle={{borderBottom:"1px solid white"}} className="align-self-xl-center m-2" to="/History" style={style}>History</NavLink>
                                        :
                    <></>
                    }
                    {isadmin
                    ?
                    <NavLink activeStyle={{borderBottom:"1px solid #0BA3F4"}} className="align-self-xl-center m-2" to="/NewQuiz" style={{textDecoration:"none",color:"#0BA3F4"}}>Create an Exam</NavLink>
                    :
                    <></>
                    }
                </Nav>
               <h5 style={{fontSize:"1em"}} 
                className="forgot-password text-white mr-3 mt-2"
               >{currentuser && currentuser.email}</h5> 
                <Button onClick={handlelogout}>Sign out</Button>
            </Navbar>
        </React.Fragment>
    )
}

export default Appbar