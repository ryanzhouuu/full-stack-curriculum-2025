import React from "react";
import "../styles/WeatherCard.css";

function WeatherCard(props) {
  return (
    <div className="weather-card">
      <h3 className="weather-card-date">{props.date}</h3>
      <div className="weather-card-temps">
        <span className="weather-card-high">{props.highTemp}°F</span>
        <span className="weather-card-low">{props.lowTemp}°F</span>
      </div>
      {/* <p className="weather-card-description">{props.description}</p> */}
      <img
        className="weather-card-icon"
        src={props.icon}
        alt={props.description}
      />
    </div>
  );
}

export default WeatherCard;
