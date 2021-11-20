import React,{useState,useEffect} from 'react'
import Quiz from "./Quiz" 
import Ques from "./Questions"
import "../dbconfiguration"
import firebase from "firebase"

function CreateQuiz() {
    const QuizDetails={
        tag:"",
        TotalQs:"",
        MarksperQ:""
    }
    const [step, setstep] = useState(true)
    const [state, setstate] = useState(QuizDetails)
    const onchangehandler = (event) => {
        setstate({
            ...state,
            [event.target.name]:event.target.value.trim()
        });
    }
   const change=(e)=>{
        if(step){
            const ref=firebase.firestore().collection("QuizList").doc(state.tag).set(state)
            .then(()=>{
                setstep(false)
            })
            .catch((error)=>{
                alert("error")
            })
        }
        else{
            setstep(true)
        }
       e.preventDefault();
   } 
    return(
        <React.Fragment>
            {
                step ? <Quiz handler={onchangehandler} change={change} value={state} /> : <Ques value={state} change={change} /> 
            }
        </React.Fragment>
    )
    
}

export default CreateQuiz
