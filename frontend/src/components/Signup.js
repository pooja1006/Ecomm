import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate("/");
        }
    })
  const handleSignup = async () =>{
    console.log(name,email,password)
    let result = await fetch('http://localhost:8000/register',{
        method: 'post',
        body: JSON.stringify({name,email,password}),
        headers: {
            'Content-Type': 'application/json'
        },

    })
    result = await result.json();
    console.log(result); //it is in readable stream
    localStorage.setItem('user',JSON.stringify(result));
    if(result){
        navigate("/");
    }
  }
  return (
    <div className="register">
      <h1>Signup</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter name"
        onChange={e => setName(e.target.value)}
        value={name}
      />
      <input
        className="inputBox"
        type="email"
        placeholder="Enter Email"
        onChange={e => setEmail(e.target.value)}
        value={email}
      />
      <input
        className="inputBox"
        type="password"
        placeholder="Enter password"
        onChange={e => setPassword(e.target.value)}
        value={password}
      />
      <button className="appbutton" type="button" onClick={handleSignup}>
        Signup
      </button>
    </div>
  );
};
export default Signup;
