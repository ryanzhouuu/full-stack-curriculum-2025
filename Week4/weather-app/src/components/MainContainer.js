import React, { useState, useEffect } from "react";
import "../styles/MainContainer.css"; // Import the CSS file for MainContainer
import WeatherCard from "./WeatherCard";

function MainContainer(props) {
  function formatDate(daysFromNow = 0) {
    let output = "";
    var date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    output += date.toLocaleString("en-US", { weekday: "long" }).toUpperCase();
    output += " " + date.getDate();
    return output;
  }

  /*
  STEP 1: IMPORTANT NOTICE!

  Before you start, ensure that both App.js and SideContainer.js are complete. The reason is MainContainer 
  is dependent on the city selected in SideContainer and managed in App.js. You need the data to flow from 
  App.js to MainContainer for the selected city before making an API call to fetch weather data.
  */

  /*
  STEP 2: Manage Weather Data with State.
  
  Just like how we managed city data in App.js, we need a mechanism to manage the weather data 
  for the selected city in this component. Use the 'useState' hook to create a state variable 
  (e.g., 'weather') and its corresponding setter function (e.g., 'setWeather'). The initial state can be 
  null or an empty object.
  */

  const [currentWeather, setCurrentWeather] = useState(null);
  const [weather, setWeather] = useState(null);

  /*
  STEP 3: Fetch Weather Data When City Changes.
  
  Whenever the selected city (passed as a prop) changes, you should make an API call to fetch the 
  new weather data. For this, use the 'useEffect' hook.

  The 'useEffect' hook lets you perform side effects (like fetching data) in functional components. 
  Set the dependency array of the 'useEffect' to watch for changes in the city prop. When it changes, 
  make the API call.

  After fetching the data, use the 'setWeather' function from the 'useState' hook to set the weather data 
  in your state.
  */

  useEffect(() => {
    if (props.selectedCity) {
      // Fetch current weather
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${props.selectedCity.lat}&lon=${props.selectedCity.lon}&appid=${props.apiKey}&units=imperial`
      )
        .then((response) => response.json())
        .then((data) => {
          setCurrentWeather(data);
        })
        .catch((error) => {
          console.error("Error fetching current weather data:", error);
        });

      // Fetch forecast data
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${props.selectedCity.lat}&lon=${props.selectedCity.lon}&appid=${props.apiKey}&units=imperial`
      )
        .then((response) => response.json())
        .then((data) => {
          // Process forecast data to get high/low temperatures for each day
          const dailyForecasts = [];
          const groupedByDay = {};
          
          // Group forecast data by day
          data.list.forEach((item) => {
            const date = new Date(item.dt_txt);
            const dayKey = date.toDateString();
            
            if (!groupedByDay[dayKey]) {
              groupedByDay[dayKey] = [];
            }
            groupedByDay[dayKey].push(item);
          });
          
          // Calculate high/low for each day
          const sortedDays = Object.keys(groupedByDay).sort((a, b) => {
            return new Date(a) - new Date(b);
          });
          
          // Get next 5 days (skip today if we have current weather)
          const today = new Date().toDateString();
          const daysToProcess = sortedDays.filter(day => day !== today).slice(0, 5);
          
          daysToProcess.forEach((dayKey) => {
            const dayData = groupedByDay[dayKey];
            const temps = dayData.map(item => item.main.temp);
            const highTemp = Math.max(...temps);
            const lowTemp = Math.min(...temps);
            
            // Use the first item for icon and description
            dailyForecasts.push({
              date: dayKey,
              highTemp: highTemp,
              lowTemp: lowTemp,
              description: dayData[0].weather[0].description,
              icon: dayData[0].weather[0].icon,
            });
          });
          
          setWeather(dailyForecasts);
        })
        .catch((error) => {
          console.error("Error fetching forecast data:", error);
        });
    }
  }, [props.selectedCity, props.apiKey]);

  return (
    <div id="main-container">
      {props.selectedCity && (
        <>
          <h1 id="city-name">
            {props.selectedCity.name}, {props.selectedCity.state}
          </h1>
        </>
      )}
      
      {/* Current Weather Display */}
      {currentWeather && (
        <div id="current-weather">
          <h2>Current Weather</h2>
          <div className="current-weather-content">
            <div className="current-weather-main">
              <img 
                src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`} 
                alt={currentWeather.weather[0].description}
                className="current-weather-icon"
              />
              <div className="current-weather-info">
                <p className="current-temp">{Math.round(currentWeather.main.temp)}°F</p>
                <p className="current-description">{currentWeather.weather[0].description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 5-Day Forecast */}
      {weather && weather.length > 0 && (
        <>
          <h2 id="forecast-title">5-Day Forecast</h2>
          <div id="weather-container">
            {weather.map((dayForecast, index) => {
              // Since we skip today, index 0 is tomorrow (1 day from now)
              const formattedDate = formatDate(index + 1);
              
              return (
                <WeatherCard
                  key={index}
                  date={formattedDate}
                  highTemp={Math.round(dayForecast.highTemp)}
                  lowTemp={Math.round(dayForecast.lowTemp)}
                  description={dayForecast.description}
                  icon={`https://openweathermap.org/img/wn/${dayForecast.icon}@2x.png`}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default MainContainer;
