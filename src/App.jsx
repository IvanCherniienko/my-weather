import React, { useState } from 'react'
import './App.css'
import { getWeatherData } from './components/fetch'

function App() {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    getWeatherData(city)
      .then(data => {
        setWeatherData(data)
        setCity('')
      })
      .catch(error => console.error(error))
  }

  return (
    <div className="App">
      <header>
        <h1>Weather</h1>
      </header>
      <div className="content-wrapper">
        <form className='form' onSubmit={handleSubmit}>
          <label>
            Enter city:
            <input type="text" value={city} onChange={e => setCity(e.target.value)} />
          </label>
          <button className='btn' type="submit">Search</button>
        </form>
        <main>
          {weatherData && (
            <div>
              <h2>{weatherData.name}, {weatherData.sys.country}</h2>
              <div className="weather">
              </div>
              <div className="temperature">
                <p>Temperature: {weatherData.main.temp}°C</p>
                <p>Rressure: {weatherData.main.pressure} гПа</p>
                <p>Description: {weatherData.weather[0].description}</p>
                <p>Humidity: {weatherData.main.humidity}%</p>
                <p>Wind speed: {weatherData.wind.speed} м/с</p>
                <p>Wind deg: {weatherData.wind.deg}</p>
                <img src={`http://openweathermap.org/img/w/10d.png`} alt="weather icon" />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App