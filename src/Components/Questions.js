import React,{useState,useEffect} from 'react'
import "../dbconfiguration"
import firebase from "firebase"
import {Redirect,Route} from "react-router-dom"
import Quizlsit from "./QuizList"
function Questions({value,change}) {
    const style={fontSize:"1em"}
    const Q={
        Question:"",
        optA:"",
        optB:"",
        optC:"",
        Correct:""
    }
    const onchangehandler = (event) => {
        setQuestions({
            ...Questions,
            [event.target.name]:event.target.value
        });
    }
    const [Questions, setQuestions] = useState(Q)
    const [count, setcount] = useState(value.TotalQs)
    const onsubmit=(e)=>{                           
        
        if(
            Questions.Question == "" ||
            Questions.optA == "" ||
            Questions.optB == "" ||
            Questions.optC == "" ||
            Questions.Correct == ""
        ){
            alert("Fill All Fields")
            e.preventDefault();
        }else{
            e.preventDefault();
            const ref=firebase.firestore().collection("QuizList").doc(value.tag).collection("Questions").add(Questions)
            .then(()=>{
                setQuestions(Q);
                setcount(count-1)
            })
            .catch((error)=>{
                alert("error")
            })
        
        }    
    }
        if(count>0){
    return (
        <div>
             <div style={{maxWidth:'400px',height:"85vh",boxSizing:"border-box",margin:"auto",marginTop:'1%',padding:'1%',boxShadow:'5px 10px 8px 10px #888888'}}>
            <form className="questionaire" style={{height:"80vh",boxSizing:"border-box"}}>
                <h5>Enter Question Details</h5>

                <div className="form-group">
                    <label style={style}>Question</label>
                    <input style={style} onChange={onchangehandler} value={Questions.Question} name='Question' type="text" className="form-control" placeholder="Question" required />
                </div>

                <div className="form-group">
                    <label style={style}>Option A</label>
                    <input style={style} onChange={onchangehandler} value={Questions.optA} name='optA' type="text" className="form-control" placeholder="Option" required />
                </div>

                <div className="form-group">
                    <label style={style}>Option B</label>
                    <input style={style} onChange={onchangehandler} value={Questions.optB} name='optB' type="text" className="form-control" placeholder="Option" required />
                </div>

                <div className="form-group">
                    <label style={style}>Option C</label>
                    <input style={style} onChange={onchangehandler} value={Questions.optC} name='optC'   type="text" className="form-control" placeholder="Option" required />
                </div>
                <div className="form-group">
                    <label style={style}>Correct Option</label>
                    <input style={style} onChange={onchangehandler} value={Questions.Correct} name='Correct'   type="text" className="form-control" placeholder="Correct Option" required />
                </div>
                <button onClick={onsubmit} type="submit" className="btn btn-dark btn-md btn-block">Continue</button>                   
            </form>            
        </div>          
        </div>
    )
}
else{
    return <Redirect to="/Home" />
}
}

export default Questions
