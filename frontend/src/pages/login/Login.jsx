import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../redux/apiCalls';
import "./login.scss";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { currentUser,isFetching, error } = useSelector((state)=>state.user);

    const loginUser = async(e) =>{
        e.preventDefault();
        login(dispatch,{username, password});
        
    }

    if(currentUser!==null){
        navigate("/loancalc");
    }
    

    return (
        <div className="logContainer">
            <div className="logWrapper">
                <h1 className="title">SIGN IN</h1>
                <form onSubmit={loginUser}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username} 
                        onChange={(e)=>setUsername(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <input
                        className="btn"
                        type="submit"
                        value="Login"
                    />
                    {error && <span className="err">Wrong Credentials!!</span>}
                    <Link to="/register">
                        <span className="forReg">Not Registered! CREATE A NEW ACCOUNT</span>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Login