import React, { useEffect, useState } from "react";
import image1 from "../assets/img/image1.png";
import image2 from "../assets/img/image2.png";
import image3 from "../assets/img/image3.png";
import image4 from "../assets/img/image4.png";
import image5 from "../assets/img/image5.png";
import { RiSendPlaneLine } from "react-icons/ri";
import "../assets/css/LoadData.css";
import { useNavigate } from "react-router-dom";
import { RELOAD_TIME } from "../constant/WeatherConstants";
import { getWeatherUrl } from "../helpers/api/ApiHelper";
import { WEATHER_ICON_REQUEST_CODE } from "../constant/WeatherConstants";
import Spinner from "./Spinner";
import { DateHelper } from "../helpers/DateHelper";
const LoadData = () => {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState([]);
  const [cacheDataStatus, setCacheDataStatus] = useState(true);

  function loadDataToComponent() {
    try {
      const getAllCacheData = async () => {
        let url = window.location.origin;
        let names = await caches.keys();

        names.forEach(async (name) => {
          if ((name = import.meta.env.VITE_CACHES_NAME)) {
            const cacheStorage = await caches.open(name);

            const cachedResponse = await cacheStorage.match(url);
            let data = await cachedResponse.json();

            setWeatherData(data.data);
          }
        });
      };

      getAllCacheData();
    } catch (error) {
      console.log(error);
    }
  }

  var stateOFWeatherDataGetFromLocalStor = true;
  useEffect(() => {
    loadDataToComponent();

    setTimeout(() => {
      if (weatherData.length == 0) {
        if (cacheDataStatus) {
          setCacheDataStatus(false);
        } else {
          setCacheDataStatus(true);
        }
      } else {
        if (stateOFWeatherDataGetFromLocalStor) {
          setInterval(loadDataToComponent, RELOAD_TIME);
          stateOFWeatherDataGetFromLocalStor = false;
        }
      }
    }, 1000);
  }, [cacheDataStatus]);

  if (weatherData.length == 0) {
    return <Spinner />;
  }
  var imageIndex = 0;
  return (
    <div className="row">
      {weatherData.map((element) => {
        var image;
        var imgNumber = imageIndex % 5;
        var des = imageIndex % 2;

        if (imgNumber == 0) {
          image = image1;
        } else if (imgNumber == 1) {
          image = image2;
        } else if (imgNumber == 2) {
          image = image3;
        } else if (imgNumber == 3) {
          image = image4;
        } else if (imgNumber == 4) {
          image = image5;
        }

        imageIndex++;

        var cityTime = DateHelper(element.dt, 2);

        var sunRise = DateHelper(element.sys.sunrise, 1);
        var sunSet = DateHelper(element.sys.sunset, 1);

        var visibility = element.visibility / 1000;
        var iconLink = getWeatherUrl(
          WEATHER_ICON_REQUEST_CODE,
          element.weather[0].icon
        );
        var classNameForPosition =
          "col-sm-12 col-md-6 col-xl-4 mt-5 cardWrapper";

        if (des == 0) {
          classNameForPosition = classNameForPosition + " offset-xl-2";
        }

        return (
          <div className={classNameForPosition}>
            <div
              className="card cardColor"
              onClick={() => {
                navigate("singleView?id=" + element.id);
              }}
            >
              <img className="card-img-top z-0" src={image} />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="z-1 bi bi-x-lg position-absolute clos"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
              <div className="card-img-overlay">
                <div className="row text-light mt-3">
                  <div className="col-6 text-center mb-md-4">
                    <h5 className="card-title">
                      {element.name},{element.sys.country}
                    </h5>
                    <h6>{cityTime}</h6>
                    <img src={iconLink} className="weatherIcon" />
                    <span className="textImg">
                      {element.weather[0].description}
                    </span>
                  </div>
                  <div className="col-6 text-center">
                    <h1 className="h1">{element.main.temp} &#8451;</h1>
                    <h6 className="card-title textDev m-auto">
                      <span className="fw-bold mt-2">Temp Min: </span>
                      {element.main.temp_min} &#8451;
                      <br />
                      <span className="fw-bold mt-1">Temp Max: </span>
                      {element.main.temp_max} &#8451;
                    </h6>
                  </div>
                </div>
              </div>

              <div className="card-body bgColourComp">
                <div className="row cardTextcolor">
                  <div className="col-4 gutter-auto borderSet textDev m-auto">
                    <div className="row">
                      <div className="col-12">
                        <b>Pressure:</b> {element.main.pressure} hPa
                      </div>
                      <div className="col-12">
                        <b>Humidity:</b> {element.main.humidity} %
                      </div>
                      <div className="col-12">
                        <b>Visibility:</b> {visibility} km
                      </div>
                    </div>
                  </div>
                  <div className="col-4 gutter-auto borderSet textDev m-auto">
                    <div className="row">
                      <div className="col-12 text-center">
                        <h3>
                          <RiSendPlaneLine />
                        </h3>
                        {element.wind.speed} m/s {element.wind.deg} Degree
                      </div>
                    </div>
                  </div>
                  <div className="col-4 gutter-auto textDev m-auto">
                    <div className="row">
                      <div className="col-12">
                        <b>Sunrise: </b>
                        {sunRise}
                      </div>
                      <div className="col-12 mt-1">
                        <b>Sunset: </b>
                        {sunSet}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LoadData;
