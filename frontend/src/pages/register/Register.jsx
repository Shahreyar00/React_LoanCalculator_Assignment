import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    const registerUser = async(e) =>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/register",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password, 
            }),
        })

        const data = await response.json();
        // console.log(data);

        if(response.ok){
            navigate("/login");
        }
    }

    return (
        <div className="logContainer">
            <div className="logWrapper">
                <h1 className="title">REGISTER</h1>
                <form onSubmit={registerUser}>
                    <input 
                        value={username}
                        placeholder="Username"
                        onChange={(e)=>setUsername(e.target.value)}
                    />
                    <input
                        value={email}
                        type="email"
                        placeholder="Email"
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <input 
                        value={password}
                        type="password"
                        placeholder="Password"
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <input 
                        className="btn"
                        type="submit"
                        value="Register"
                    />
                </form>
            </div>
        </div>
    )
}

export default Register