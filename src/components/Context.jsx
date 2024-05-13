import React from "react";
import LoadData from "../components/LoadData";
import WeatherIcon from "./WeatherIcon";
import WeatherCityADD from "./WeatherCityADD";

const Context = () => {
  return (
    <>
      <WeatherIcon />
      <WeatherCityADD />
      <LoadData />
    </>
  );
};

export default Context;
