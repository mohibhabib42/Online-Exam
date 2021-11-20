import React,{useState,useEffect} from 'react'
import {Table,Button} from "react-bootstrap" 
import  "./Tablestyle.scss"
import ModalButton from "./PopUp"
import "../dbconfiguration"
import firebase from "firebase"
import { useAuth } from "../contexts/Authprovider" 
import Viewbutton from "./SecondModal"

 function QuizList() {
   
   const list=[];
   const listtwo=[];
  const [length, setlength] = useState(0)
  const [Quizs, setQuizs] = useState([])
  const {currentuser}=useAuth();
  const [attempted, setattempted] = useState([])
  const [loading, setloading] = useState(true)
  const [isadmin, setisadmin] = useState(true)
  
  const createlist= async ()=>{
    const ref2=await firebase.firestore().collection("Users").doc(currentuser.email).collection("Responses")
    .onSnapshot((query)=>query.forEach((quiz)=>listtwo.push(quiz.id)));
    const ref=await firebase.firestore().collection("QuizList");
        ref.onSnapshot((query)=>{
          query.forEach((quiz)=>{
                  list.push(quiz.data());
          });
        setQuizs(list)
        setattempted(listtwo)
        })
        if(currentuser.email !== "mohib.habib42@gmail.com"){
          setisadmin(false);
        }
        setloading(false)
  } 
   useEffect(() => {

        createlist();
        
   },[loading])

  if(loading){
    return (<h3>Loading...</h3>)
  }  
  else{
  return (
              <> 
                <div id="tablediv" style={{boxShadow:'5px 10px 8px 10px #888888'}}>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th style={{width:"10%"}}>Quiz#</th>
                        <th style={{textAlign:"center"}}>Quiz Title</th>
                      </tr>
                    </thead>
                    <tbody>
                        {Quizs.map((quiz,i)=>(
                          <tr key={quiz.tag}>
                            <td>{i+1}</td>
                            <td>{quiz.tag}
                            <Viewbutton button="View" choose={quiz} key={quiz.tag+1} />
                            {isadmin
                            ?
                            <Viewbutton button="Delete" choose={quiz} key={quiz.tag+"a"} />
                            :
                            <></>
                            }
                            {isadmin
                            ?
                            <></>
                            :
                            !attempted.includes(quiz.tag)?<ModalButton key={quiz.tag} choose={quiz} />:<Button style={{float:'right',background:'transparent',border:'none',color:'green'}}>Attempted</Button>
                            }
                              
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>   
                </div>
              </>
    )
   }
}

export default QuizList
