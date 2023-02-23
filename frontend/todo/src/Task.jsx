import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Update from './Update'

function Task() {
  const {_id}= useParams();
  const [tasks,setTasks]=useState([]);
  const [info,setInfo]=useState({})  

  useEffect(()=>{
    const loadData =async()=>{
      const res= await axios.post('http://localhost:3001/task',{id:_id})
      // console.log(res.data)
      console.log(res.data.task.map(e=>console.log(e.Status)))
        setInfo(res.data)
        setTasks(res.data.task)
      
    }
    loadData();
  },[])
  const items = tasks.map((e)=>{
    return(
      <div key={e._id}>
        id:{e._id}
        description:{e.taskDes } 
        Status:{e.Status }
      </div>
    )
  })

  return (
    <div>{info.title}
    {items}
    <Update itemId={_id}/></div>
  )
}

export default Task