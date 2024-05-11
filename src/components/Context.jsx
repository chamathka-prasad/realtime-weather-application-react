import React from "react";
import LoadData from "../components/LoadData";
import LoadToLocalStor from "./LoadToLocalStor";
import WeatherIcon from "./WeatherIcon";
import WeatherCityADD from "./WeatherCityADD";

const Context = () => {
  return (
    <>
      <LoadToLocalStor />
      <WeatherIcon />
      <WeatherCityADD />
      <LoadData />
    </>
  );
};

export default Context;
