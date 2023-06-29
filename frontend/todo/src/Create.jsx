import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import './Create.css'
const Create = () => {
  const [item, setItem] = useState("");
  const [status, setStatus] = useState(true);
  const [title, setTitle] = useState("");

  const [list, setList] = useState([]);
  const [_id, setId] = useState("");
  const inputRef = useRef();
  const dRef = useRef();

  const SubmitValue = () => {
    console.log(status);
    axios.post("http://localhost:3001/user", {
      title: title,
      taskDes: item,
      Status: status,
    });
  };

  return (
    <React.Fragment>
      <div className="createContainer">
        <h3>Create Project</h3>
        <form onSubmit={SubmitValue}>
          <input
            type="text"
            name="title-entry"
            // value={title}
            placeholder="Title Entry"
            ref={inputRef}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            name="item-entry"
            // value={item}
            placeholder="Item Entry"
            ref={inputRef}
            onChange={(e) => setItem(e.target.value)}
          />

          <input
            type="checkbox"
            name="item-entry"
            // value={status}
            placeholder="Status"
            ref={inputRef}
            onChange={(e) => setStatus(!(e.target.value))}
          />

          <button type="submit">Add Item</button>
        </form>
          <Link to="/login">login</Link>
              <br />
              <Link to="/">Signup</Link>
      </div>
    </React.Fragment>
  );
};

export default Create;
