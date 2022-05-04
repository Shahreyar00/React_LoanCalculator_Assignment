import React, { useEffect, useState } from 'react';
import date from 'date-and-time';
import "./weather.scss";
import Navbar from '../../components/navbar/Navbar';
import { FaSnowflake } from "react-icons/fa";
import { HiSun } from "react-icons/hi";

const api = {
    key: "e1a823c3078fb0d93295fd7a6eefb934",
    base: "https://api.openweathermap.org/data/2.5/"
}

const Weather = () => {
    const [query,setQuery] = useState("");
    const [weather,setWeather] = useState({});

    const search = evt => {
        if (evt.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                setWeather(result);
                setQuery('');
                // console.log(result);
            });
        }
    }

    const dateBuilder = (d) =>{
        return date.format(d,'ddd, MMM DD YYYY');
    }

    return (
        <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? "app warm" : "app") : "app"}>
            <Navbar />
            <div className="iconWeather">
                {weather.main.temp>16?(<span><FaSnowflake /></span>):(<span><HiSun /></span>)}
            </div>

            <main>
                <div className="search-box">
                    <input 
                        type="text" 
                        className="search-bar"
                        placeholder="Search..."
                        value={query}
                        onChange={(e)=>setQuery(e.target.value)}
                        onKeyPress={search}
                    />
                </div>
                {(typeof weather.main != "undefined")?(
                    <div>
                        <div className="location-box">
                            <div className="location">{weather.name}, {weather.sys.country}</div>
                            <div className="date">{dateBuilder(new Date())}</div>
                        </div>
                        <div className="weather-box">
                            <div className="temp">
                                {Math.round(weather.main.temp)}°c
                            </div>
                            <div className="weather">{weather.weather[0].main}</div>
                        </div>
                    </div>
                ):("")}
            </main>
        </div>
    )
}

export default Weather