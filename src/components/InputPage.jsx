import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function InputPage() {

    const [location, setLocation] = useState("")
    const [userLocation, setUserLocation] = useState("")
    const apiUrl = "https://ipapi.co/json"
    const navigate = useNavigate()
    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        if (location === "") {
            toast.error("Enter Valid City name", toastOptions)
            return false
        }
        else {
            navigate(`/${location}`);
            toast.success(`${location} is correct`)
            return true
        }
    }
    const toastOptions = {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 8000,
        pauseOnHover: true,
        theme: 'red'
    };
    useEffect(() => {
        getLocation()
    }, [])
    const getLocation = async () => {
        const location = await axios.get(apiUrl)
        setUserLocation(location.data.city)
        console.log(location.data.city);
        if (userLocation) {
            navigate(`/${userLocation}`)
            toast.success("City is correct", toastOptions)
        }
    }

    return (
        <div className='container'>
            <ToastContainer toastStyle={{ backgroundColor: "black", color: "white" }} />
            <h2>Weather App</h2>
            <hr />
            <form onSubmit={handleSubmit} >
                <input
                    type="text"
                    placeholder="Enter location"
                    value={location}
                    onChange={handleLocationChange}
                />

            </form>
            <div className='line'>
                <hr style={{ width: '40%' }} />
                or
                <hr style={{ width: '40%' }} />
            </div>
            { }
            <button onClick={getLocation} >Get Device Location</button>

        </div>
    )
}
export default InputPage