import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi"
import { MdOutlineLocationOn } from "react-icons/md"
import cloud from "../images/cloud.png"
import humidity from "../images/humidity.png"
import rain from "../images/rain.png"
import mist from "../images/mist.png"
import drizzle from "../images/drizzle.png"
import clear from "../images/clear.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DataPage() {
    const { location } = useParams();
    // const apiKey = process.env.REACT_APP_API_KEY
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1799d3fc86e5898ee66b7da3aef7c863`
    const [weatherData, setWeatherData] = useState({
        celcias: 10,
        name: "",
        humidity: 10,
        speed: 2,
        feels_like: 20,
        image: "../assets/images/cloud.png",
        description: "clouds",
        country: "india"
    });

    useEffect(() => {
        getLocation()
    }, [])

    const getLocation = async () => {

        axios.get(apiUrl)
            .then((res) => {
                console.log(res.data)

                let imagePath = ""
                if (res.data.weather[0].main === "Clouds") {
                    imagePath = cloud
                } else if (res.data.weather[0].main === "Clear") {
                    imagePath = clear
                } else if (res.data.weather[0].main === "Rain") {
                    imagePath = rain
                } else if (res.data.weather[0].main === "Haze") {
                    imagePath = drizzle
                } else if (res.data.weather[0].main === "Mist") {
                    imagePath = mist
                } else {
                    imagePath = cloud
                }

                setWeatherData({
                    ...weatherData,
                    celcias: res.data.main.temp,
                    feels_like: res.data.main.feels_like,
                    humidity: res.data.main.humidity,
                    name: res.data.name,
                    speed: res.data.wind.speed,
                    image: imagePath,
                    description: res.data.weather[0].description,
                    country: res.data.sys.country
                })

                if (location === res.data.name) {
                    toast.success(`${location} is correct`, toastOptions)
                    return true
                }
                else if (weatherData !== res.data.name) {
                    toast.success(`${location} is  Correct`, toastOptions)
                    return false
                }


            })
            .catch((err) => {
                console.log(err);
            })
    }



    const toastOptions = {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 8000,
        pauseOnHover: true,
        theme: 'green'
    };
    return (
        <div className='container-data'>
            <ToastContainer toastStyle={{ backgroundColor: "black", color: "white" }} />
            <div className='icon-part'>
                <Link to={'/'} className='back-icon'>
                    <BiArrowBack />
                </Link>
                <span>Weather App</span>
            </div>
            <hr className='first-line' />
            <div className='weather-info'>
                <img src={weatherData.image} alt="cloud" />
                <p className='weather-info-cels'>{Math.round(weatherData.celcias)}° C</p>
                <p className='weather-info-desc'>{weatherData.description}</p>
                <p className='weather-info-name'> <MdOutlineLocationOn /> {weatherData.name} , {weatherData.country}</p>
            </div>
            <div className='degree'>
                <div className="left-degree">
                    <i className="fas fa-temperature-down"></i>
                    <div className='left-deg-info'>
                        <p>{Math.round(weatherData.feels_like)}° C</p>
                        <p>feels_like</p>
                    </div>
                </div>
                <div className='v-line'></div>
                <div className="right-degree">
                    <img src={humidity} alt="" />
                    <div className='right-deg-info'>
                        <p>{weatherData.humidity}%</p>
                        <p>Humidity</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DataPage