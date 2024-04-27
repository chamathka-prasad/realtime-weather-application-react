import React, { useEffect, useState } from 'react'

import List from '../cities.json'
import { API_WEATHER } from '../constat/WeatherConstants';
import { FETCH_URL_WEATHER } from '../constat/Api';
import { RELOAD_TIME } from '../constat/WeatherConstants';

const LoadToLocalStor = () => {

    const [weatherData, setWeatherData] = useState([]);
 

    useEffect(() => {

      
        getDataFromServer();
        setInterval(() => {
         
    

            getDataFromServer();

        }, RELOAD_TIME);


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