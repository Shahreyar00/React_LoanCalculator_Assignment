import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../../redux/userRedux';
import "./navbar.scss";

const Navbar = () => {
    const cUser = useSelector((state)=>state.user.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = (e) =>{
        e.preventDefault();
        dispatch(logOut({currentUser:null}));
        navigate("/");
    }

    return (
        <div className="navContainer">
            <div className="navWrapper">
                <Link to="/">
                    <span className="logo">INSTALoaN.</span>
                </Link>
                <div className="navItems">
                    {!cUser ? (
                        <>
                            <Link to="/register">
                                <button className="navButton">Register</button>
                            </Link>
                            <Link to="/login">                        
                                <button className="navButton">Login</button>
                            </Link>
                        </>
                    ) : ( 
                        <>
                            <button className="navButton" onClick={handleLogout}>
                                Logout 
                            </button>
                            {cUser?(<span className="userName">Welcome {(cUser.username).slice(0,12)}</span>):(<span className="userName">Please Login</span>)}
                        </>
                    ) 
                        
                    }

                </div>
            </div>
        </div>
    )
}

export default Navbar