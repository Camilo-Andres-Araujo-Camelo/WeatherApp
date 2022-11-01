import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Container = () => {
    
    const key = '85bcb3b38d2dfbd55c5f339491c123c4'
    
    
    const [weatherInfo, setWeatherInfo] = useState({})

    useEffect(() => {
        const getPosition = (position)=> {
            const lat = position.coords.latitude
            const lon = position.coords.longitude

            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}8&lon=${lon}&appid=${key}`)
            .then(res => setWeatherInfo(res.data))
            console.log(position);
        }
        navigator.geolocation.getCurrentPosition(getPosition)
        
    }, [])

    const [isCelsius, setIsCelsius ] = useState(true)

    return (
        <div className='Container'>
            <h1>Weather App</h1>
            <h2>City: <span>{`${weatherInfo.name}, ${weatherInfo.sys?.country}`}</span></h2>
            <div className='mainContainer'>
                <div className='iconContainer'>
                    <img width={150} src={`http://openweathermap.org/img/wn/${weatherInfo.weather?.[0].icon}@2x.png`}></img>
                    <p className='degrees'>
                        {isCelsius ? (weatherInfo.main?.temp - 273.15).toFixed(0) : ((((weatherInfo.main?.temp) -273.15)* 1.8)+32).toFixed(0)} {isCelsius ? "C°" : "F°"}
                    </p>
                <button onClick={()=> setIsCelsius(!isCelsius)}>Degrees °F/°C</button>
                </div>
                <div className='parametersContainer'>
                    <p><i class="fa-solid fa-cloud"></i> Cloudiness: <span>{`${weatherInfo.weather?.[0].description}`}</span></p>
                    <p><i class="fa-solid fa-wind"></i> Wind Speed: <span>{`${weatherInfo.wind?.speed}`} kts</span></p>
                    <p><i class="fa-solid fa-droplet"></i> Humidity: <span> {`${weatherInfo.main?.humidity}`}% </span></p>
                    <p><i class="fa-solid fa-temperature-full"></i> Pressure: <span>{`${weatherInfo.main?.pressure}`} hPa </span></p>
                </div>
            </div>
        </div>
    );
};

export default Container;