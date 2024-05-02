import React, { useEffect, useState } from "react";
import { CITY_WEATHER_REQUEST_CODE } from "../constat/WeatherConstants";
import List from "../cities.json";

import { RELOAD_TIME } from "../constat/WeatherConstants";

import { getWeatherUrl } from "../constat/Api";

const LoadToLocalStor = () => {
  useEffect(() => {
    getDataFromServer();
    setInterval(() => {
      getDataFromServer();
    }, RELOAD_TIME);

    function getDataFromServer() {
      var data = List.List;

      var promises = new Array();

      try {
        data.forEach((element) => {
          promises.push(
            fetch(getWeatherUrl(CITY_WEATHER_REQUEST_CODE, element.CityCode))
          );
        });

        async function filterData() {
          const resp = await Promise.allSettled(promises);
          const fulfilledArray = [];
          resp.map((objects) => {
            if (objects.status === "fulfilled") {
              fulfilledArray.push(objects.value);
            }
          });

          const weather = await Promise.all(
            fulfilledArray.map((item) => {
              return item.json();
            })
          );

          try {
            const newData = {
              time: Date.now(),
              data: weather,
            };

            const addDataIntoCache = (cacheName, url, response) => {
              const data = new Response(JSON.stringify(response));

              if ("caches" in window) {
                caches.open(cacheName).then((cache) => {
                  cache.put(url, data);
                });
              }
            };
            addDataIntoCache(
              import.meta.env.VITE_CACHES_NAME,
              window.location.origin,
              newData
            );
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
};

export default LoadToLocalStor;
