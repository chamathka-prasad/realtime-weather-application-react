import React, { useEffect } from "react";
import { CITY_WEATHER_REQUEST_CODE } from "../constant/WeatherConstants";
import List from "../data/cities.json";
import { RELOAD_TIME } from "../constant/WeatherConstants";
import { getWeatherUrl } from "../helpers/api/ApiHelper";

const LoadToLocalStor = () => {
  useEffect(() => {
    getDataFromServer();
    setInterval(() => {
      getDataFromServer();
    }, RELOAD_TIME);

    function getDataFromServer() {
      var data = List.List;

      async function checkAvailabilityOfTheCache() {
        let names = await caches.keys();

        if (names.length == 0) {
          insertDataTOCache();
        } else {
          if (names.includes(import.meta.env.VITE_CACHES_NAME)) {
            checkTimeLenght(import.meta.env.VITE_CACHES_NAME);
          }
        }
      }

      checkAvailabilityOfTheCache();

      async function checkTimeLenght(name) {
        let url = window.location.origin;
        let cacheStorage = await caches.open(name);
        const cachedResponse = await cacheStorage.match(url);

        let data = await cachedResponse.json();
        if (Date.now() - data.time > RELOAD_TIME) {
          insertDataTOCache();
        }
      }

      async function insertDataTOCache() {
        var promises = new Array();

        try {
          data.forEach(async (element) => {
            promises.push(
              fetch(
                getWeatherUrl(CITY_WEATHER_REQUEST_CODE, element.CityCode),
                { method: "POST" }
              )
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

            if (weather.length != 0) {
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
          }
          filterData();
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, []);
};

export default LoadToLocalStor;
