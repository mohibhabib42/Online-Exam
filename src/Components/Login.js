import React,{useState} from 'react' 
import {useAuth} from "../contexts/Authprovider"
import {Link,useHistory} from 'react-router-dom'
function Login() {
    const {login}= useAuth()
    async function handlesubmit(e){
        e.preventDefault();
        try{
            // setloading(true)
            await login(email,password)
            history.push("/Home")
        }
        catch{
            alert("Error")
        }
        // setloading(false)
    }
    const {currentuser}=useAuth()
    const  [loading, setloading] = useState(false)
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const history=useHistory()
    

    return (
    <div style={{width:'30%',margin:"auto",marginTop:'5%',padding:'2%',boxShadow:'5px 10px 8px 10px #888888'}}>
        

                    <h3>Log in</h3>
                  

            <div className="form-group">
                <label>Email</label>
                <input onChange={event => setemail(event.target.value)} value={email} type="email" className="form-control" placeholder="Enter email" />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input onChange={event => setpassword(event.target.value)} value={password} type="password" className="form-control" placeholder="Enter password" />
            </div>

            <button onClick={handlesubmit} name='submit' type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
            <p className="forgot-password text-center mt-4">
                 Create an account? <Link to="/Register">Sign up</Link>
            </p>
    
    </div>
    )
}

export default Login
