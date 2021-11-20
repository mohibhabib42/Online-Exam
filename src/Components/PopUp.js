import React,{useState,useEffect} from 'react'
import {Modal,Button} from "react-bootstrap"
import "../dbconfiguration"
import {Redirect} from "react-router-dom"
import firebase from "firebase"
import { useAuth } from "../contexts/Authprovider" 

function PopUp({choose}) {
    const [show, setShow] = useState(false);
    const list=[];
    const [previous, setprevious] = useState({})
    const {currentuser}=useAuth();
    const [totalgainmarks, settotalgainmarks] = useState(0)
    const [totalmarks, settotalmarks] = useState(0)
    const [email, setemail] = useState({mail:currentuser.email})
    const handleClose = () => setShow(false);
    const handleShow = () =>{setShow(true);getdata()} 
    const [state, setstate] = useState("")
    const [correctanswers, setcorrectanswers] = useState(0)
    const [Questions, setQuestions] = useState([])
    const [Loading, setLoading] = useState(true)
    const [QID, setQID] = useState([])
    const [index, setindex] = useState(choose.TotalQs-1)
    
    const getdata=  async () => {
        const getdata=await firebase.firestore().collection("Users").doc(currentuser.email);
        getdata.get().then((query)=>{
            settotalgainmarks(query.data().GainedMarks);
            settotalmarks(query.data().TotalMarks);
        })
        const ref=await firebase.firestore().collection("QuizList").doc(choose.tag).collection("Questions");
        ref.onSnapshot((query)=>{
            query.forEach((Question)=>{
                QID.push(Question.id);
                list.push(Question.data());
            });
        setQuestions(list);
        setLoading(false)
        })
    }
    
    const [Add_Data, setAdd_Data] = useState(false)
    const [redirect, setredirect] = useState(false)
    useEffect(() => {
        
        if(Add_Data){
            const a=parseInt(choose.MarksperQ)
            const b=parseInt(choose.TotalQs)
            const reference=firebase.firestore().collection("Users").doc(currentuser.email);
            reference.set({
                GainedMarks:totalgainmarks+correctanswers*a,
                TotalMarks:totalmarks+a*b
            },{merge:true});
            reference.collection("Responses").doc(choose.tag).set({
                Total_Marks:a*b,
                Marks_Obtained:correctanswers*a
            }).then(()=>{
                alert("Submitted")
                setredirect(true)
            })
        }
    },[Add_Data] )
    const check = () => {
        if(state === ""){alert("Must Choose an Option")}
        else if(index >= 1){
            goodquestion()
            nextQuestion()
        }else if(index === 0){
            goodquestion();
            setAdd_Data(true)
        }
    }
    const goodquestion= ()=>{
        if(state === Questions[index].Correct){
            setcorrectanswers(correctanswers+1);
        }
    }
    
    const nextQuestion = () => {
            setindex(index-1)
            setstate("")
    }
    const handlesubmit=(e)=>{
        setstate(e.target.value)
    }
    if(!redirect){
    return (
        <>
      <Button style={{float:'right',marginRight:'1%'}} variant="primary" onClick={handleShow}>
        Start 
      </Button>
       
      <Modal
        animation={false}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{choose.tag}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {Loading ? <p>Loading..</p>  :
                <>
                    <h5> Q: {Questions[index].Question}</h5>
                    <input onChange={handlesubmit} type="radio" id="A" name="answer" value="A" />
                    <label htmlFor="A">{Questions[index].optA}</label><br/>
                    <input onChange={handlesubmit} type="radio" id="B" name="answer" value="B" />
                    <label htmlFor="B">{Questions[index].optB}</label><br/>
                    <input onChange={handlesubmit} type="radio" id="C" name="answer" value="C" />
                    <label htmlFor="C">{Questions[index].optC}</label>
                </>
            }
        </Modal.Body>
        <Modal.Footer><p>Choosen: {state}</p>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={check} variant="primary">Next</Button>
        </Modal.Footer>
      </Modal>
    </>
    )}
    else{
        return <Redirect to="/Home" />
    }
}

export default PopUp
