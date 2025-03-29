import React, { useEffect, useState } from "react";
import { FaSearch, FaTemperatureHigh } from "react-icons/fa";
import "./Weather.css";
import { WiHumidity } from "react-icons/wi";
import { LuWind } from "react-icons/lu";
import { GiPressureCooker } from "react-icons/gi";
import { CircleLoader } from "react-spinners";
import { clear, cloud, drizzle, rain, snow } from "../../assets";

const Weather = () => {
  const [city, setCity] = useState("darbhanga");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataOnly, setDataOnly] = useState({});

  const allIcon = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
          import.meta.env.VITE_API_ID
        }`
      );
      const data = await response.json();
      const icon = allIcon[data.weather[0].icon] || clear;
      setDataOnly({
        temperatue: Math.floor(data.main.temp),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        name: data.name,
        country: data.sys.country,
        description: data.weather[0].description,
        icon: icon,
        windspeed: data.wind.speed,
      });
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching the weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] capitalize p-6">
      <h1 className="text-4xl font-bold mb-8 text-[#fff] ">
        Weather Dashboard
      </h1>
      <form onSubmit={handleSubmit} className="flex gap-2 items-center  mb-8">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="px-4 py-2 rounded-[40px] shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className=" p-3 bg-[#7d7b7b] text-white rounded-[40px] shadow-md hover:bg-[#a9a8a8] transition duration-300"
        >
          <FaSearch />
        </button>
      </form>

      {loading && (
        <div className=" flex w-full justify-center items-center">
          <CircleLoader color="#00ffc6" size={80} />{" "}
        </div>
      )}

      {weatherData ? (
        <>
          <div className="bg-[#3c147ceb] boxShadow p-6 text-[#fff] rounded-lg  text-center md:w-[40vw] w-[80vw]">
            <div className="p-2">
              <div className="flex justify-center">
                <img
                  // src={`https://openweathermap.org/img/wn/${dataOnly.icon}@2x.png`}
                  src={dataOnly.icon}
                  alt="temp"
                  className="w-[4em]"
                />
              </div>
              <h2 className="text-2xl font-bold mb-4">{dataOnly.name}</h2>
              <div className="flex w-full justify-between">
                <div className="flex m-4">
                  <WiHumidity className="text-[40px] text-[#23eefc]" />
                  <p className="text-lg">{dataOnly.humidity}%</p>
                </div>
                <div className="flex m-4 items-center">
                  <FaTemperatureHigh className="text-[#f1c722]" />
                  <p className="text-[1em]">
                    {" "}
                    &nbsp; &nbsp;
                    {dataOnly.temperatue}°C
                  </p>
                </div>
              </div>
              <div className="flex m-4 w-full justify-between">
                <p className="text-lg">Desc: {dataOnly.description}</p>
                <div className="flex">
                  <LuWind className="text-[40px]" /> &nbsp; &nbsp;
                  <p className="text-lg">{dataOnly.windspeed} Km/h</p>{" "}
                </div>
              </div>
              <div className="flex m-4 w-full justify-between">
                <p className="text-lg">Country: {dataOnly.country}</p>
                <div className="flex">
                  <GiPressureCooker className="text-[40px] text-[#ea3333]" />{" "}
                  &nbsp; &nbsp;
                  <p className="text-lg">{dataOnly.pressure} Pa</p>{" "}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
