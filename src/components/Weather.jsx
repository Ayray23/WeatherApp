import { useEffect, useRef, useState } from 'react'
import { FaSearch } from "react-icons/fa";
// import { TiWeatherDownpour } from 'react-icons/ti';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { TiWeatherSunny } from 'react-icons/ti';
import { WiHumidity } from "react-icons/wi";
import { WiWindBeaufort11 } from 'react-icons/wi';

import weather from '../assets/weather-2.png'
const Weather = () => {
  const inputRef = useRef()
  const [weatherData, setWeatherData] = useState(false)

  // const allIcons = {
  //   "01d": WiHumidity,
  //   "01n": WiHumidity,
  //   "02d": WiWindBeaufort11,
  //   "02n": TiWeatherPartlySunny,

  // }

  const search = async (city)=>{
    if(city === "")
      alert("Enter city name")
    try{
      const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&unit={metric}&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch (url) ;
      const data = await response.json();

      if(!response.ok){
          alert(data.message);
          return;
      }

      console.log(data)
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature:Math.floor(data.main.temp),
        location: data.name,
        icon:"https://openweathermap.org/img/wn/02d@2x.png"
      },[])
      
    } catch (error){
      setWeatherData(false)
      console.error
    }
  }

    useEffect(()=>{
      search("Lagos");
    },[])   

  return (
    <>
    <section className='place-self-center flex flex-col items-center  bg-blue-700 p-4 rounded-lg'>
      <h1 className='text-3xl text-white p-4 font-bold'>Weather</h1>
        <div className='flex items-center gap-2'>
          <input ref={inputRef} type="text" placeholder="Enter city name" className="p-2 h-[50px] border-none pl-6 rounded-full f " />
          <FaSearch className='text-white text-2xl cursor-pointer ' onClick={()=>search(inputRef.current.value)} />
        </div>
        {weatherData?<>
        <div className='flex justify-center' >
          <div className='text-white  ' >
            <div className='flex text-7xl flex-col justify-center items-center'>
            <img src={weatherData.icon} alt="" className='w-[100px] h-[100px] mt-6' />
            <h2 className='text-xl'>{weatherData.location}</h2>
              <p className='text-6xl'>{weatherData.temperature - 273}°C</p>
            </div>
            <div className='flex mt-8 gap-2 justify-between'>
                <WiHumidity className='text-4xl' />
              <div className='text-4xl flex flex-col '>
                <h4 className='text-xl'>{weatherData.humidity}%</h4>
                <h4 className='text-xl'>Humidity</h4>
              </div>
                <WiWindBeaufort11 className='text-4xl'/>
              <div className='flex flex-col '>
                <h4 className='text-xl'> {weatherData.windSpeed} km/h</h4>
                <h4 className='text-xl'>Wind speed</h4>
              </div>
            </div>
          </div>

            {/* <div className='flex flex-row'>
            <TiWeatherSunny />

            </div>
            <div className='flex flex-row'>
            <TiWeatherPartlySunny />

            </div>
            <div className='flex flex-row'>
            <TiWeatherDownpour />
              <h1>ee</h1>
            </div> */}
          
        </div>
        
        </>:<></>}
    </section>

    </>
  )
}

export default Weather

