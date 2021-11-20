import React,{useState,useEffect} from 'react'
import {Table,Button} from "react-bootstrap" 
import "../dbconfiguration"
import firebase from "firebase"
import { useAuth } from "../contexts/Authprovider" 


 function History(props) {
    const {currentuser}=useAuth();
    const [Quizs, setQuizs] = useState([])
    const [QuizId, setQuizId] = useState([])
    const [Loading, setLoading] = useState(true)
    const list=[];
    const GetData = async () => {
        const ref=await firebase.firestore().collection("Users").doc(currentuser.email).collection("Responses")
        .onSnapshot((query)=>{
            query.docs.forEach((quiz)=>{
                list.push(quiz.data());
                QuizId.push(quiz.id);
            })
            setQuizs(list);
            setLoading(false)
        })
    } 
    useEffect(() => {
        GetData();
    }, [])
    if(Loading) return <h3>Loading..</h3>
    else return (
        <>
            <div id="tablediv" style={{boxShadow:'5px 10px 8px 10px #888888'}}>
                <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th style={{textAlign:"center"}}>Quiz Title</th>
                        <th style={{textAlign:"center",width:'30%'}}>Quiz Marks</th>
                      </tr>
                    </thead>
                    <tbody>
                    {Quizs.map((quiz,i)=>(
                        <tr key={QuizId[i]}>
                            <td style={{textAlign:'center'}}>{QuizId[i]}</td>
                            <td style={{textAlign:'center'}}>{quiz.Marks_Obtained}/{quiz.Total_Marks}</td>
                       </tr>
                    ))
                    }                          
                    </tbody>
                </Table>   
            </div>
        </>
    );
}

export default History