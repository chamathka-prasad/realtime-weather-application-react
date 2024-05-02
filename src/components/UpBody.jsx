import React from "react";
import logo from "../assets/img/logo.png";
import "../assets/css/UpBody.css";

const UpBody = () => {
  return (
    <>
      <div className="row">
        <div className="col-12 mt-5">
          <div className="row">
            <div class="col-8 offset-2 text-center fw-bold text-light">
              <img src={logo} height={40} /> Weather App
            </div>

            <div className="col-lg-4 offset-lg-4 col-10 offset-1 text-center">
              <div className="input-group mt-5 mb-3">
                <input
                  type="text"
                  className="placeholder-glow form-control texUpBodIn text-light border-0 "
                  style={{ backgroundColor: "#30333d" }}
                  placeholder=" Enter a City"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />

                <button
                  className="btn  text-light fw-medium"
                  style={{
                    backgroundColor: "#6c5cd2",
                    color: "whitesmoke",
                    borderRadius: 7,
                  }}
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
    </>
  );
};

export default UpBody;
