import React, { useEffect, useState } from 'react'
import logo from '../assets/img/logo.png'
import { useNavigate, useSearchParams } from 'react-router-dom';
import image1 from '../assets/img/blueBack.png'
import { RiSendPlaneLine } from "react-icons/ri";
import { MONTHS_ARRAY, ICON_LINK_URL } from '../constat/WeatherConstants';

const SingleView = () => {



    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    var id = searchParams.get("id");

    var allData = JSON.parse(localStorage.getItem("wet"));
    var datObj = allData.data;

    var element;

    datObj.forEach(elementd => {

        if (id == elementd.id) {
            element = elementd;
        }
    });





 
    var d = new Date(element.dt * 1000);
    var options = { timeZone: 'Asia/Colombo' };
    const month = MONTHS_ARRAY;

    var sunR = new Date(element.sys.sunrise * 1000);
    var sunS = new Date(element.sys.sunset * 1000);
    var stat = d.toLocaleTimeString().split(" ");
    var vis = element.visibility / 1000;
    var iconLink = ICON_LINK_URL + element.weather[0].icon + "@2x.png";

    return (


        <>



            <div className='vh-100'>
                <div className="row">
                    <div className="col-12 mt-5">
                        <div className="row">
                            <div className="col-8 offset-2 text-center fw-bold text-light"> <img src={logo} height={40} /> Weather App</div>


                        </div>
                    </div>
                </div>







                <div className="col-sm-12 col-md-8 offset-md-2 col-xl-6 offset-xl-3 mt-5">

                    <div className="card cardColor carr" onClick={() => {


                    }} style={{ backgroundColor: "#388ee7", border: "none" }}>



                        <img className="card-img-top mb-5" src={image1} />
                        <div className="card-img-overlay mt-lg-5 mt-md-0 mb-5">
                            <div className="row text-start  text-light position-absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi cs bi-arrow-left" viewBox="0 0 16 16" onClick={() => {

                                    navigate("/");
                                }}>
                                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                                </svg>
                            </div>
                            <div className="row text-light">
                                <div className="col-12 text-center">
                                    <h5 className="card-title" id="country">{element.name},{element.sys.country}</h5>
                                    <h6 className="h6 " style={{ fontSize: 11 }} > {d.getHours() + "." + d.getMinutes() + " " + stat[1] + " " + month[d.getMonth()] + " " + d.getDate()}</h6>
                                </div>

                                <div className='col-12'>
                                    <div className='row '>
                                        <div style={{ borderColor: '#383b47' }} className=" col-6 m-auto text-end p-3 border border-top-0 border-bottom-0 border-start-0">


                                            <h6 className="h6 fw-normal" >

                                                <img src={iconLink} height={60} style={{ marginRight: 10 }} alt="" />
                                                <br /><span style={{ marginRight: 5 }}>{element.weather[0].description}</span></h6>

                                        </div>
                                        <div className="col-6 text-start p-3 fw-light">
                                            <h1 className="h1 mt-2">{element.main.temp} &#8451;</h1>
                                            <h6 className="card-title" style={{ fontSize: 13 }} >Temp Min: {element.main.temp_min} &#8451;</h6>
                                            <h6 className="h6" style={{ fontSize: 13 }}>Temp Max: {element.main.temp_max} &#8451;</h6>

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
                                            <b>Visibility:</b> {vis} km
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
                                            <b>Sunrise:</b> {sunR.getHours() + "." + sunR.getMinutes() + " " + sunR.toLocaleTimeString().split(" ")[1]}
                                        </div>
                                        <div className="col-12">
                                            <b>Sunset:</b> {sunS.getHours() + "." + sunS.getMinutes() + " " + sunS.toLocaleTimeString().split(" ")[1]}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>








                </div>










            </div >







        </>







    );
}




export default SingleView