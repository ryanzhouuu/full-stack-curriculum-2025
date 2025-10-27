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
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${props.selectedCity.lat}&lon=${props.selectedCity.lon}&appid=${props.apiKey}&units=imperial`
      )
        .then((response) => response.json())
        .then((data) => {
          // Filter to get one forecast per day (around 12:00 PM each day)
          const dailyForecasts = data.list.filter((item, index) => {
            const date = new Date(item.dt_txt);
            // Get forecasts around noon (12:00) or closest to noon
            return (
              date.getHours() === 12 || (index === 0 && date.getHours() < 12)
            );
          });
          // If we don't have exactly 5 days, use the first item for today and then every 8th item
          // (since API returns data every 3 hours, every 8th item is approximately daily)
          if (dailyForecasts.length === 0 || dailyForecasts.length < 5) {
            const simplifiedDaily = [];
            for (let i = 0; i < 5 && i * 8 < data.list.length; i++) {
              simplifiedDaily.push(data.list[i * 8]);
            }
            setWeather(simplifiedDaily);
          } else {
            setWeather(dailyForecasts.slice(0, 5)); // Take only first 5 days
          }
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  }, [props.selectedCity, props.apiKey]);

  return (
    <div id="main-container">
      {props.selectedCity && (
        <>
          <h1>5-Day Forecast</h1>
          <h1 id="city-name">
            {props.selectedCity.name}, {props.selectedCity.state}
          </h1>
        </>
      )}
      <div id="weather-container">
        {/* 
        STEP 4: Display Weather Data.
        
        With the fetched weather data stored in state, use conditional rendering (perhaps the ternary operator) 
        to display it here. Make sure to check if the 'weather' state has data before trying to access its 
        properties to avoid runtime errors. 

        Break down the data object and figure out what you want to display (e.g., temperature, weather description).
        This is a good section to play around with React components! Create your own - a good example could be a WeatherCard
        component that takes in props, and displays data for each day of the week.
        */}
        {weather &&
          weather.map((weather, index) => (
            <WeatherCard
              key={index}
              date={formatDate(index)}
              temp={weather.main.temp}
              description={weather.weather[0].description}
              icon={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            />
          ))}
      </div>
    </div>
  );
}

export default MainContainer;
