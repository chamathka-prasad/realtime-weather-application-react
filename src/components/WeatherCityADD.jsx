import React from "react";
import "../assets/css/WeatherCityADD.css";

const WeatherCityADD = () => {
  return (
    <>
      <div className="weatherCityAddWrap ">
        <div className="row">
          <div className="col-12 mt-5">
            <div className="row ">
              <div className="col-lg-4 offset-lg-4 col-10 offset-1 text-center">
                <div className="input-group mt-5 mb-3">
                  <input
                    type="text"
                    className="texUpBodIn placeholder-glow form-control  border-0"
                    placeholder=" Enter a City"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />

                  <button
                    className="btn btn-primary addCityBtn fw-medium border-0"
                    type="button"
                    id="button-addon2"
                  >
                    Add City
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherCityADD;
