import React, { useState, useRef } from "react";
import axios from "axios";
function AddItem({docId}) {
    const [item, setItem] = useState("");
  const [status, setStatus] = useState(true);
//   const [title, setTitle] = useState("");

  const inputRef = useRef();
  const dRef = useRef();

  

  const SubmitValue = async(e) => {
    e.preventDefault();
    console.log(docId);
    const resp =await axios.put("http://localhost:3001/user/item", {
        id:docId,
      taskDes: item,
      Status: status,
    });
    console.log(resp)
    alert(resp.data);
  };
  return (
    <div>
      <h3>Add Items</h3>

        
        
        
        <form onSubmit={SubmitValue}>
          

          <input
            type="text"
            name="item-entry"
            value={item}
            placeholder="Item Entry"
            ref={inputRef}
            onChange={(e) => setItem(e.target.value)}
            // onChange={(e) => setItem(payload)}

          />

          <input
            type="checkbox"
            name="item-entry"
            value={status}
            placeholder="Status"
            ref={inputRef}
            onChange={(e) => setStatus(!(e.target.value))}
          />

          <button type="submit">Add Item</button>
        </form>
    </div>
  )
}

export default AddItem;