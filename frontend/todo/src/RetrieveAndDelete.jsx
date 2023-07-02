import React,{ useState } from 'react'
import axios from 'axios'
import './Retrieve.css'
// import TodoList from './TodoList';
import {Link, useParams  } from 'react-router-dom'; 

const Retrieve = ()=>{

    const [list,setList]=useState([]);
    // const [_id,setId]=useState("");
    // const [task,setTask]=useState([]);
    // const inputRef=useRef();
    // const dRef=useRef();
   
    
    const fetchData= async ()=>{
        const res =  await axios.get('http://localhost:3001/user')
        
            setList(res.data)
            console.log(res.data)     

        // setId(id=>id+1);
        
    }
   
    

    const remove=async(value)=>{
        console.log(value._id)
        // _id: JSON.stringify(value._id)
        const val = await axios.delete('http://localhost:3001/user',{data:{id:value._id}})
        // .then((err)=>{
        //     console.log(err);
        // }
        // )
        console.log(val);
        alert(val.data)
    }
        const cart =list.map((value)=>{
            return  (
                <div className='fetch'  key={value._id}>

                        {value._id}  | {value.title} 
                        <Link to={`/todos/${value._id}`}>More Details...</Link> 

                        {/* <button onClick={()=>fetchTask(value)} 
                            
                             ref={inputRef}>More Details...</button> */}
                        <button onClick={()=>{remove(value)}}>remove</button>
                    
                </div>
            
            )
    
        })
        
    
    return(
        <React.Fragment>
            <div className='retrieveContainer'>
                <h3>Fetch Projects</h3>
               
                {/* {Get Request} */}
                <button className='fetchbtn' onClick={fetchData}>fetch</button>

                <br />
                    <ul>

                        {cart}
                    </ul>


            </div>
        </React.Fragment>
    )
}
export default Retrieve;