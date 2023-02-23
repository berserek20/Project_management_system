import React,{ useState,useRef } from 'react'
import axios from 'axios'

const Todo = ()=>{
    // const stud=[{item:"ms dhoni"},{item:"rohit Sharma"}]
    const [item,setItem]=useState("");
    const [status,setStatus]=useState(true);
    const [title,setTitle]=useState("")

    const [list,setList]=useState([]);
    const [_id,setId]=useState("");
    const inputRef=useRef();
    const dRef=useRef();

    // function SetValue(e){
    //     e.preventdefalut();
        
    //     setItem(inputRef.current.value);
    // }
    // function SetValue(e){
    //     e.preventdefalut();

    //     setStatus(inputRef.current.value);
    // }
    const fetchData= async ()=>{
        const res =  await axios.get('http://localhost:3001/user')
        
            setList(res.data)
            console.log(res.data)     

        // setId(id=>id+1);
        
    }
    const SubmitValue=()=>{
        console.log(status)
        axios.post('http://localhost:3001/user',{
            title:title,
            taskDes:item,
            Status: status
        })
    }
    const remove=(_id)=>{
  
           
                axios.delete('http://localhost:3001/user',{id:_id}).then((err)=>{
                    console.log(err);
                }
                )
            
       
    }
    const fetchTask=(value)=>{
        const taskLi=value.task.map((e)=>{
            return(e.taskDes)
        })
        console.log(taskLi)
    }
        const cart =list.map((value)=>{
            return  (<button onClick={()=>fetchTask(value)} 
                             key={value._id}
                             ref={inputRef} >
                <h3>
                        {value._id}  | {value.title} 

                    </h3>
            </button>
            )
    
        })
    
        
    
    return(
        <React.Fragment>
            <div>
                Todo
                {/* {Post request} */}
                <form onSubmit={SubmitValue}>
                   
                <input 
                    type="text"
                    name="title-entry"
                    value={title}    
                    placeholder="Title Entry"
                    ref={inputRef}         
                    onChange={(e)=>setTitle(e.target.value)}/>

                    <input 
                    type="text"
                    name="item-entry"
                    value={item}    
                    placeholder="Item Entry"
                    ref={inputRef}         
                    onChange={(e)=>setItem(e.target.value)}/>
                    
                    <input 
                    type="checkbox"
                    name="item-entry"
                    value={status}    
                    placeholder="Status"
                    ref={inputRef}         
                    onChange={(e)=>setStatus(e.target.value)}/>


                    <button type="submit">Add Item</button>
                </form>
                {/* {update request} */}
                <input placeholder='id'
                        name="item-id"
                        ref={inputRef}
                        value={_id}
                        onChange={(e)=>setId(e.target.value) }/>

<input 
                    type="text"
                    name="title-entry"
                    value={title}    
                    placeholder="Title Entry"
                    ref={inputRef}         
                    onChange={(e)=>setTitle(e.target.value)}/>

                    <input 
                    type="text"
                    name="item-entry"
                    value={item}    
                    placeholder="Item Entry"
                    ref={inputRef}         
                    onChange={(e)=>setItem(e.target.value)}/>
                    
                    <input 
                    type="checkbox"
                    name="item-entry"
                    value={status}    
                    placeholder="Status"
                    ref={inputRef}         
                    onChange={()=>setStatus(!status)}/>
                        {/* {delete Request} */}
                <button onClick={remove}>remove</button>
                {/* {Get Request} */}
                <button onClick={fetchData}>fetch</button>

                <br />
                    {/* <h3>itemName    itemId</h3> */}
            <ul>

                {cart}
            </ul>
            </div>
        </React.Fragment>
    )
}

export default Todo;