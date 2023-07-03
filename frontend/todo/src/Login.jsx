import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [mailId, setMailId] = useState("");
  const [password, setPassword] = useState("");
  const signIn = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:3001/auth/login", {
      mail_id: mailId,
      password: password,
    });
    console.log("token",await res.data.token)
    if (res.data.token) {
      console.log(res);
      navigate("/todo");
    } else {
      navigate("/login");
    }
    console.log(`email ${mailId} password: ${password}`);//remove it
  };
  return (
    <div>
      <div className="container">

        <h1>Login</h1>
        <form onSubmit={signIn}>
          <input
            type="text"
            placeholder="mail id"
            onChange={(e) => setMailId(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">Login</button>
        </form>
        <br />
        <Link to="/">Signup</Link>
      </div>
    </div>
  );
}

export default Login;
