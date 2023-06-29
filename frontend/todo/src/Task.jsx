import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Update from './Update'
import AddItem from './AddItem';
import Api from './create-subparts/Api';
import './Task.css';

function Task() {
  const {_id}= useParams();
  const [tasks,setTasks]=useState([]);
  // const [info,setInfo]=useState({})
  const [itemId,setItemId]=useState('')  

  useEffect(()=>{
    const loadData =async()=>{
      const res= await axios.post('http://localhost:3001/user/task',{id:_id})
      console.log(res.data)
      // console.log(res.data.task.map(e=>console.log(e.Status)))
        // setInfo(res.data)
        setTasks(res.data.task)
      
    }
    loadData();
  },[])
  const items = tasks.map((e)=>{
    return(
      <div className="item" key={e._id} style={{borderColor: itemId === e._id ? "blue":"white"}}>
        id:{e._id}
        <br />
        description:{e.taskDes } 
        <br />

        Status:{e.Status.toString() }
        <br />

        <button onClick={()=>{refData(e)}}>Select</button>
      </div>
    )
  })
  const refData =(val)=>{
    setItemId(val._id)
    console.log(val._id)
  }

  return (
    <div className="container">
      <h1>Project:{_id}</h1>
      <br />
    
      <div className='taskContainer'>
        
        {/* {info.title} */}
      <div className="taskContainer1">
        <Update  spaceId={_id} selectedId={itemId}/>
        <AddItem  docId={_id}/>

          <ul>

            {items}
          </ul>
      </div>
        <Api  docId={_id}/>
      </div>
    </div>
  )
}

export default Task