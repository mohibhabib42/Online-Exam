import React,{useState,useEffect} from 'react'
import {Modal,Button} from "react-bootstrap"
import {Redirect} from "react-router-dom"
import "../dbconfiguration"
import firebase from "firebase"
function SecondModal({choose,button}) {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const DeleteQuiz =  () => {
    const ref= firebase.firestore().collection("QuizList").doc(choose.tag).delete().then(()=>{window.location.reload(false);});
  }
switch (button) {
    case "View":
        return(
            <>
        <Button style={{float:'right',marginRight:'1%'}} variant="primary" onClick={handleShow}>
        View
      </Button>

      <Modal centered show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{choose.tag}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h6>No of Questions: {choose.TotalQs}</h6>
            <h6>Marks per Question: {choose.MarksperQ}</h6>
            <h6>Total Marks: {choose.MarksperQ*choose.TotalQs}</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
        )
        break;
    case "Delete":
        return(
            <>
        <Button style={{float:'right',marginRight:'1%'}} variant="primary" onClick={handleShow}>
        Delete
      </Button>

      <Modal centered show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Are You sure?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
        <Button variant="secondary" onClick={DeleteQuiz}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
        )
        break;   
    default:
        break;
}



}

export default SecondModal
