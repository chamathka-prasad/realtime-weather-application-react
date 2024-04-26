import React, { useEffect, useState } from 'react'

import image1 from '../assets/img/image1.png'
import image2 from '../assets/img/image2.png'
import image3 from '../assets/img/image3.png'
import image4 from '../assets/img/image4.png'
import image5 from '../assets/img/image5.png'
import { RiSendPlaneLine } from "react-icons/ri";
import SingleView from './SingleView'
import { json, useNavigate } from 'react-router-dom'
import { ICON_LINK_URL } from '../constat/WeatherConstants' 
import { MONTHS_ARRAY } from '../constat/WeatherConstants'

const LoadData = () => {

    const navigate = useNavigate();
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {

        try {

            console.log(localStorage.getItem("wet") + " wet data");
            var allData = JSON.parse(localStorage.getItem("wet"));
            setWeatherData(allData.data);
            // setWeatherData(weather);
            console.log("wda");

            // localStorage.setItem("wet", JSON.stringify(newData));



        } catch (error) {
            console.log(error);


        }







    }, []);
    var ind = 0;

    return (

        <div className='row'>


            {


                weatherData.map((element) => {

                    var image;
                    var imgNumber = ind % 5;
                    var des = ind % 2;
                    console.log("img number " + imgNumber);
                    if (imgNumber == 0) {
                        image = image1;
                    } else if (imgNumber == 1) {
                        image = image2;
                    }
                    else if (imgNumber == 2) {
                        image = image3;
                    }
                    else if (imgNumber == 3) {
                        image = image4;
                    }
                    else if (imgNumber == 4) {
                        image = image5;
                    } else {

                    }
                    ind++;

                    var d = new Date(element.dt * 1000);
                    var options = { timeZone: 'Asia/Colombo' };
                    const month = MONTHS_ARRAY;
                    var sunR = new Date(element.sys.sunrise * 1000);
                    var sunS = new Date(element.sys.sunset * 1000);
                    var stat = d.toLocaleTimeString().split(" ");
                    var vis = element.visibility / 1000;
                    var iconLink =  ICON_LINK_URL+element.weather[0].icon+"@2x.png";
                    if (des == 0) {
                        
                        return (


                            <div className="col-sm-12 col-md-6 col-xl-4 mt-5 offset-xl-2">

                                <div className="card cardColor" onClick={() => {

                                    navigate("singleView?id=" + element.id);
                                }} style={{ backgroundColor: "rgb(41, 40, 40)", border: "none" }}>

                                    <img className="card-img-top" src={image} />
                                    <div className="card-img-overlay">
                                        <div className="row text-light mt-3">

                                            <div className="col-6 text-center mb-md-4">
                                                <h5 className="card-title">{element.name},{element.sys.country}</h5>
                                                <h6>
                                                    {d.getHours() + "." + d.getMinutes() + " " + stat[1] + " " + month[d.getMonth()] + " " + d.getDate()}
                                                </h6>

                                                <img src={iconLink}  height={40} alt="" /> <span className='textImg'>{element.weather[0].description}</span>
                                            </div>
                                            <div className="col-6 text-center">
                                                <h1 className="h1">{element.main.temp} &#8451;</h1>
                                                <h6 className="card-title textDev m-auto">
                                                    <span className="fw-bold mt-2">Temp Min: </span>{element.main.temp_min} &#8451;<br />
                                                    <span className="fw-bold mt-1">Temp Max: </span>{element.main.temp_max} &#8451;
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

                        );
                    } else {
                        return (


                            <div className="col-sm-12 col-md-6 col-xl-4 mt-5 ">

                                <div className="card cardColor" style={{ backgroundColor: "rgb(41, 40, 40)", border: "none" }} onClick={() => {

                                    navigate("singleView?id=" + element.id);
                                }}>
                                    <div className="card-img-overlay mt-3">
                                        <div className="row text-light ">

                                            <div className="col-6 text-center">
                                                <h5 className="card-title">{element.name},{element.sys.country}</h5>
                                                <h6>
                                                    {d.getHours() + "." + d.getMinutes() + " " + stat[1] + " " + month[d.getMonth()] + " " + d.getDate()}
                                                </h6>
                                                <img src={iconLink}  height={40} alt="" /> <span className='textImg'>{element.weather[0].description}</span>
                                            </div>
                                            <div className="col-6 text-center">
                                                <h1 className="h1">{element.main.temp} &#8451;</h1>
                                                <h6 className="card-title textDev m-auto">
                                                    <span className="fw-bold">Temp Min: </span>{element.main.temp_min} &#8451;<br />
                                                    <span className="fw-bold">Temp Max: </span>{element.main.temp_max} &#8451;
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                    <img className="card-img-top " src={image} />

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
                                                        <b>Visibility:</b> {vis} km
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-4 gutter-auto  borderSet textDev m-auto">
                                                <div className="row">
                                                    <div className="col-12 text-center">
                                                        <h3>
                                                            <RiSendPlaneLine />
                                                        </h3>
                                                        {element.wind.speed} m/s {element.wind.deg} Degree
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-4 gutter-auto textDev m-auto ">
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

                        );
                    }




                })


            }



        </div>

    );
}





export default LoadData