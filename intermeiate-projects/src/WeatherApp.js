import { useState } from "react";
import "./weatherapp.css";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState();
  const fetechData = async () => {
    console.log("start");
    const getcity = city.trim().toLowerCase();
    const apiKey = "5ad52d05adf17645e42c03331c05c0ff";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${getcity}&appid=${apiKey}&units=metric
`;
    const fetchData = await fetch(url);
    if (!fetchData.ok) throw new Error("Api Failed to get Data");
    let data = await fetchData.json();
    console.log(data);
    setWeatherData(data);
  };

  return (
    <div className="weather-container">
      <h1>🌦 Weather App</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={() => fetechData()}>Search</button>
      </div>

      {/* Weather Info */}
      {weatherData && (
        <div className="weather-card">
          <h2>
            {weatherData.name} ({weatherData.sys.country})
          </h2>
          <h4>{weatherData.weather[0].description}</h4>
          <p>🌡 Temperature: {weatherData.main.temp}°C</p>
          <p>💧 Humidity: {weatherData.main.humidity}%</p>
          <p>🌬 Feels Like: {weatherData.main.feels_like} m/s</p>
          <p>🌬 Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
