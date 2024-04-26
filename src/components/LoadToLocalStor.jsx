import React, { useEffect, useState } from 'react'

import List from '../cities.json'
import { API_WEATHER } from '../constat/WeatherConstants';
import { FETCH_URL_WEATHER } from '../constat/Api';

const LoadToLocalStor = () => {

    const [weatherData, setWeatherData] = useState([]);
    const millTimes = 1000 * 60;

    useEffect(() => {


        var vr = JSON.parse(localStorage.getItem("wet"));
        console.log(vr.time + " " + Date.now());
        if ((Date.now() - vr.time) < millTimes) {
            console.log("podi");
            console.log(Date.now() - vr.time);

        } else {
            console.log(Date.now() - vr.time);
            console.log("timeCheck");

            var data = List.List;


            var promises = new Array();

            try {


                data.forEach(element => {
                    promises.push(fetch(FETCH_URL_WEATHER + element.CityCode + "&units=metric&appid=" + API_WEATHER));

                });


                async function filterData() {

                    const resp = await Promise.allSettled(promises);
                    const fulfilledArray = [];
                    resp.map(objects => {
                        if (objects.status === "fulfilled") {
                            fulfilledArray.push(objects.value);
                        }
                    })

                    const weather = await Promise.all(fulfilledArray.map((item) => {
                        return item.json();
                    }))






                    try {


                        setWeatherData(weather);


                        console.log("wda");
                        const newData = {
                            time: Date.now(),
                            data: weather,
                        };
                        localStorage.setItem("wet", JSON.stringify(newData));

                        console.log(localStorage.getItem("wet") + " wet data");
                        vr = JSON.parse(localStorage.getItem("wet"));

                    } catch (error) {
                        console.log(error);


                    }




                }
                filterData();

            } catch (error) {
                console.log(error);
            }


        }



    }, []);

}




export default LoadToLocalStor