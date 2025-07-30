// App.jsx
import React, { useState } from 'react';

const App = () => {
  const [searchCity, setSearchCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = 'e5c2265b0dce440eb26103611252507'; // ← Replace with your WeatherAPI.com API key

  const getWeather = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${searchCity}`
      );
      const data = await response.json();

      if (data.error) {
        setWeatherData(null);
        setError('City not found!');
      } else {
        setWeatherData(data);
        setError('');
      }
    } catch (err) {
      setError('Something went wrong!');
      setWeatherData(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-blue-500 p-6">
      <h1 className="text-3xl font-bold text-white mb-8">🌦️ Weather App</h1>

      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter city name..."
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={getWeather}
            className="px-5 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {/* Conditional UI */}
        {error && (
          <p className="text-red-500 text-center font-semibold">{error}</p>
        )}

        {weatherData && (
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-gray-800">
              {weatherData.location.name}, {weatherData.location.country}
            </h2>
            <img
              src={weatherData.current.condition.icon}
              alt="weather icon"
              className="mx-auto"
            />
            <p className="text-4xl font-bold text-blue-600">
              {weatherData.current.temp_c}°C
            </p>
            <p className="text-gray-500 capitalize">
              {weatherData.current.condition.text}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
