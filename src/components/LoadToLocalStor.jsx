import React, { useEffect, useState } from 'react'

import List from '../cities.json'
import { API_WEATHER } from '../constat/WeatherConstants';
import { FETCH_URL_WEATHER } from '../constat/Api';

const LoadToLocalStor = () => {

    const [weatherData, setWeatherData] = useState([]);
    const millTimes = 1000 * 60*5;

    useEffect(() => {


        var vr = JSON.parse(localStorage.getItem("wet"));


        if (vr == null) {

            getDataFromServer();

        } else {

           
            if ((Date.now() - vr.time) > millTimes) {
                getDataFromServer();
            } 
        }




        function getDataFromServer() {

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


                        
                        const newData = {
                            time: Date.now(),
                            data: weather,
                        };
                        localStorage.setItem("wet", JSON.stringify(newData));

                   
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



    }, [weatherData]);


}




export default LoadToLocalStor