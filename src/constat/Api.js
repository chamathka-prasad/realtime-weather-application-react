import {
  CITY_WEATHER_REQUEST_CODE,
  WEATHER_ICON_REQUEST_CODE,
} from "./WeatherConstants";

const BASEURL_API = "http://api.openweathermap.org/";
const ICON_LINK_URL = "https://openweathermap.org/img/wn/";

const WEATHER_ROUTES = {
  getCityWeather: "data/2.5/weather?id=",
  getWeatherIcons: "img/wn/",
};
export const getWeatherUrl = (route, parameter) => {
  var url = BASEURL_API + WEATHER_ROUTES[route];

  if (route == CITY_WEATHER_REQUEST_CODE) {
    url += parameter;
    url +=
      "&units=" +
      import.meta.env.VITE_WEATHER_UNITS +
      "&appid=" +
      import.meta.env.VITE_API_WEATHER;
  } else if (route == WEATHER_ICON_REQUEST_CODE) {
    url = ICON_LINK_URL + parameter + "@2x.png";
  }

  return url;
};
