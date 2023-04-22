import React, { useState ,useEffect} from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth){
        navigate("/");
    }
})
  const handleLogin = async () => {
    console.log(email, password);
    let result = await fetch('http://localhost:8000/login',{
        method: 'post',
        body: JSON.stringify({email,password}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    result = await result.json();
    console.log(result);
    if(result.name){
        localStorage.setItem("user",JSON.stringify(result));
        navigate("/");

    }else{
        alert('please enter correct email/password')
    }
  };
  return (
    <div className="login">
      <input
        className="inputBox"
        type="email"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        className="inputBox"
        type="password"
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button className="appbutton" type="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};
export default Login;
