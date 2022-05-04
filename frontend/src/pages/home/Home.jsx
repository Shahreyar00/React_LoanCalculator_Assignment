import React, { useEffect, useState } from 'react';
import "./home.scss";
import Navbar from '../../components/navbar/Navbar';
import { FaGithub, FaLinkedinIn  } from "react-icons/fa";
import { AiFillChrome } from "react-icons/ai";
import { Link } from 'react-router-dom';
import useGeolocation from '../../hooks/useGeolocation';

const Home = () => {
    const location = useGeolocation();

    const [lat, setLat] = useState("");
    const [lon, setLon] = useState("");

    useEffect(()=>{
        setLat(JSON.stringify(location.coordinates.latitude));
        setLon(JSON.stringify(location.coordinates.longitude));
    },[location.loaded]);

    return (
        <div className="homeContainer">
            <Navbar />
            <div className="homeBody">
                <div className="bodyWrapper">
                    <div className="wrapperLeft">
                        <span className="title">welcome</span>
                        <p className="desc">
                            You can calculate your loan and see 
                            all the installments at one place.
                            We will assist you through the whole process and
                            make sure that you get the loan on time and at 
                            the lowest rate possible.
                        </p>

                        <div className="pageOption">
                            <Link to="/loancalc">
                                <span className="p1">  Go to Loan Calculator (Access After Login) </span>
                            </Link>
                        </div>
                        <div className="pageOption">
                            <Link to="/weather">
                                <span className="p1">  Go to Weather finder (Access Without Login) </span>
                            </Link>
                        </div>

                        <div className="followOption">
                            <a href="https://github.com/Shahreyar00" target="_blank" rel="noreferrer">
                                <span className="f1"><FaGithub /></span>
                            </a>
                            <a href="https://shahreyar-portfoliowebsite.netlify.app/" target="_blank" rel="noreferrer">
                                <span className="f1"><AiFillChrome /></span>
                            </a>
                            <a href="https://www.linkedin.com/in/md-shahreyar-arif-278b541b8/" target="_blank" rel="noreferrer">
                                <span className="f1"><FaLinkedinIn /></span>
                            </a>
                        </div>
                    </div>
                    <div className="lineBetween"></div>
                    <div className="wrapperRight">
                        <span className="temp">
                            {location.loaded
                                ? `Latitude=${lat} Longitude=${lon}`
                                :"Location data not available"
                            }
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home