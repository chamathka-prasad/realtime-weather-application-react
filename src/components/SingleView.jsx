import React, { useEffect, useState } from "react";
import logo from "../assets/img/logo.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import image1 from "../assets/img/blueBack.png";
import { RiSendPlaneLine } from "react-icons/ri";
import {
  CITY_WEATHER_REQUEST_CODE,
  MONTHS_ARRAY,
} from "../constant/WeatherConstants";
import "../assets/css/SingleView.css";
import { WEATHER_ICON_REQUEST_CODE } from "../constant/WeatherConstants";
import { getWeatherUrl } from "../helpers/api/ApiHelper";
import Spinner from "./Spinner";
import WeatherIcon from "./WeatherIcon";
import { DateHelper } from "../helpers/DateHelper";

const SingleView = () => {
  <WeatherIcon />;
  window.scrollTo(0, 0);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  var id = searchParams.get("id");

  const [element, setElement] = useState();

  useEffect(() => {
    fetch(getWeatherUrl(CITY_WEATHER_REQUEST_CODE, id), { method: "POST" })
      .then((resp) => {
        if (resp.status == 200) {
          return resp.json();
        } else {
          navigate("/");
        }
      })
      .then((value) => {
        if (value != null) {
          setElement(value);
        }
      })
      .catch((error) => {});
  }, []);

  var cityTime;
  var sunRise;
  var sunSet;
  var visibility;
  var iconLink;

  try {
    cityTime = DateHelper(element.dt, 2);
    sunRise = DateHelper(element.sys.sunrise, 1);
    sunSet = DateHelper(element.sys.sunset);
    visibility = element.visibility / 1000;
    iconLink = getWeatherUrl(
      WEATHER_ICON_REQUEST_CODE,
      element.weather[0].icon
    );
  } catch (error) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <>
      <div className="vh-100 singlecsssWrap">
        <div className="col-sm-12 col-md-8 offset-md-2 col-xl-6 offset-xl-3 mt-5">
          <div className="card  cardColor" onClick={() => {}}>
            <img className="card-img-top mb-5" src={image1} />
            <div className="card-img-overlay mt-lg-5 mt-md-0 mb-5">
              <div className="row text-start  text-light position-absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="backArrow bi cs bi-arrow-left"
                  viewBox="0 0 16 16"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <path
                    fill-rule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                  />
                </svg>
              </div>
              <div className="row text-light">
                <div className="col-12 text-center">
                  <h5 className="card-title">
                    {element.name},{element.sys.country}
                  </h5>
                  <h6 className="h6 citTime">{cityTime}</h6>
                </div>

                <div className="col-12">
                  <div className="row ">
                    <div className=" col-6 m-auto text-end p-3 border border-top-0 border-bottom-0 border-start-0 ">
                      <h6 className="h6 fw-normal">
                        <img className="iconImg" src={iconLink} alt="" />
                        <br />
                        <span className="weatherDiscription">
                          {element.weather[0].description}
                        </span>
                      </h6>
                    </div>
                    <div className="col-6 text-start p-3 fw-light">
                      <h1 className="h1 mt-2">{element.main.temp} &#8451;</h1>
                      <h6 className="card-title subTemp">
                        Temp Min: {element.main.temp_min} &#8451;
                      </h6>
                      <h6 className="h6 subTemp">
                        Temp Max: {element.main.temp_max} &#8451;
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body  bgColourComp  mt-5 mt-lg-2">
              <div className="row cardTextcolor  text-center mb-2 ">
                <div className="col-4 gutter-auto borderSet textDev m-auto ">
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
                      <b>Sunrise:</b> {sunRise}
                    </div>
                    <div className="col-12">
                      <b>Sunset:</b> {sunSet}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleView;
