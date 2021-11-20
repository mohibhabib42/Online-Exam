import React,{useRef, useState} from 'react'
import {useAuth} from "../contexts/Authprovider"
import {Link,useHistory} from 'react-router-dom'
import "../dbconfiguration"
import firebase from "firebase"
import {Redirect} from "react-router-dom"

function Register() {
    
    const {signup}= useAuth()
    const history=useHistory()
    async function handlesubmit(e){
        e.preventDefault();
        try{
            setloading(true)
            await signup(state.email,state.password)
            history.push("/")
        }
        catch{
            alert("Error")
        }
        setloading(false)
    }
    const handlesubmission = (e) => {

        firebase.auth().createUserWithEmailAndPassword(state.email, state.password)
        .then((userCredential) => {
            const ref=firebase.firestore().collection("Users").doc(state.email).set(state);
            <Redirect to="/Home" />
        });
        
    }
    const [state, setstate] = useState({fname:'',lname:'',email:'',password:'',TotalMarks:0,GainedMarks:0})
    const  [loading, setloading] = useState(false)
    const onchangehandler = (event) => {
        setstate({
            ...state,
            [event.target.name]:event.target.value.trim()
        });
    }
    
    return (
        <div style={{maxWidth:'400px',margin:"auto",marginTop:'3%',padding:'2%',boxShadow:'5px 10px 8px 10px #888888'}}>
            <form onSubmit={handlesubmit} >
                <h3>Register</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input onChange={onchangehandler} name='fname' value={state.fname} type="text" className="form-control" placeholder="First name" required />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input onChange={onchangehandler} name='lname' value={state.lname} type="text" className="form-control" placeholder="Last name" required />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input onChange={onchangehandler} name='email' value={state.email} type="email" className="form-control" placeholder="Enter email" required />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input onChange={onchangehandler} name='password' value={state.password} type="password" className="form-control" placeholder="Enter password" required />
                </div>

                <button onClick={handlesubmission} disabled={loading} type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
                <p className="forgot-password text-center mt-3">
                    Already registered <Link to="/Login">log in?</Link>
                </p>
            </form>            
        </div>
    )
}

export default Register
