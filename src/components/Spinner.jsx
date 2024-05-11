import React from "react";
import "../assets/css/Spinner.css";
const Spinner = () => {
    return (
        <>
            <div className="row">
                <div className="col-12 text-center vh-100">
                    <div>
                        <div class="spinner-grow text-warning text ms-1 spinTopPosition" role="status"></div>
                        <div class="spinner-grow text-danger text ms-1 spinTopPosition" role="status"></div>
                        <div class="spinner-grow text-info text ms-1 spinTopPosition" role="status"></div>
                        <div class="spinner-grow text-success text ms-1 spinTopPosition" role="status"></div>
                    </div>
               </div>
            </div>
        </>
    );
};

export default Spinner;
