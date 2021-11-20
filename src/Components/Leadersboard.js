import React,{useState,useEffect} from 'react'
import "../dbconfiguration"
import firebase from "firebase"
import {Table,Button} from "react-bootstrap" 
import { useAuth } from "../contexts/Authprovider" 


function Leadersboard() {
    const {currentuser}=useAuth();
    const [records, setrecords] = useState([])
    const list=[];

    useEffect(() => {
        GetData();
    }, [])
    
    const GetData=async()=>{
        const ref=await firebase.firestore().collection("Users");
        ref.onSnapshot((query)=>{
          query.forEach((record)=>{
                  list.push(record.data());
          });
        
        setrecords(list.sort(function(a,b){return b.GainedMarks-a.GainedMarks;}))
        })
        records.sort();
    }

    return (
        <>
            <div id="tablediv" style={{boxShadow:'5px 10px 8px 10px #888888'}}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th style={{width:"10%"}}>Position</th>
                        <th style={{width:"40%",textAlign:"center"}}>Student</th>
                        <th style={{textAlign:"center"}}>Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                    {records.map((record,i)=>(
                          <tr key={record.email}>
                            <td>{i+1}</td>
                            <td>{record.email}</td>
                            <td style={{textAlign:"center"}}>{record.GainedMarks}/{record.TotalMarks}</td>
                          </tr>
                        ))}
                    </tbody>
                </Table>   
            </div>
        </>
    )
}

export default Leadersboard
