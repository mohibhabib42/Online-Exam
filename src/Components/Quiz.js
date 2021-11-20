import React from 'react'

function Quiz({handler,change,value}){
    return(
        <div style={{maxWidth:'400px',margin:"auto",marginTop:'3%',padding:'2%',boxShadow:'5px 10px 8px 10px #888888'}}>
            <form onSubmit={change} >
                <h3>Enter Quiz Details</h3>

                <div className="form-group">
                    <label>Quiz Title</label>
                    <input onChange={handler} name='tag' defaultValue={value.tag} type="text" className="form-control" placeholder="Enter Title (must be unique)" required />
                </div>

                <div className="form-group">
                    <label>Total Questions</label>
                    <input onChange={handler} name='TotalQs' defaultValue={value.TotalQs}  type="number" className="form-control" placeholder="Enter Number of Questions" required />
                </div>

                <div className="form-group">
                    <label>Marks Per Question</label>
                    <input onChange={handler} name='MarksperQ' defaultValue={value.MarksperQ}  type="number" className="form-control" placeholder="Enter Marks" required />
                </div>
                <button type="submit" className="btn btn-dark btn-lg btn-block">Continue</button>
                    
            </form>            
        </div>
    )
}

export default Quiz
