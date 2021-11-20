import React,{useState,useEffect} from 'react'
import "../dbconfiguration"
import firebase from "firebase"
import {Table} from "react-bootstrap"

function StudentsList() {
    const list=[];
    const [Users, setQuizs] = useState([])
    const [loading, setloading] = useState(true)
     useEffect(() => {
       const ref=firebase.firestore().collection("Users");
       ref.onSnapshot((query)=>{query.forEach((user)=>{
         list.push(user.data());
        });
      setQuizs(list)
      setloading(false)
      })
     }, [])
     const dosomething=(e)=>{
      console.log(e.target.id)
     }
    return (
        <React.Fragment>
  
        <div id="tablediv" style={{boxShadow:'5px 10px 8px 10px #888888'}}>
         <Table striped bordered hover>
  <thead>
    <tr>
      <th style={{width:"10%"}}>#</th>
      <th style={{textAlign:"center"}}>Student ID</th>
    </tr>
  </thead>
  <tbody>
  {Users.map((user,i)=>(
    <tr key={user.email}>
      <td>{i+1}</td>
      <td>{user.email}</td>
    </tr>
  ))}
  </tbody>
</Table>   
        </div>
        </React.Fragment>
    )
}

export default StudentsList
