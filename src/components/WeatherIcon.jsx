import React from "react";
import logo from "../assets/img/logo.png";
import "../assets/css/WeatherIcon.css";

const WeatherIcon = () => {
  return (
    <>
      <div className="row">
        <div className="col-12 mt-5">
          <div className="row">
            <div className="col-8 offset-2 text-center fw-bold text-light">
              <img src={logo} className="logoImg" /> Weather App
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherIcon;
