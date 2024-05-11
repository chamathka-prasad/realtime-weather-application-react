import {
  BASEURL_API,
  CITY_WEATHER_REQUEST_CODE,
  ICON_LINK_URL,
  WEATHER_ICON_REQUEST_CODE,
  WEATHER_ROUTES,
} from "../../constant/WeatherConstants";

export const getWeatherUrl = (route, parameter) => {
  var url = BASEURL_API + WEATHER_ROUTES[route];

  if (route == CITY_WEATHER_REQUEST_CODE) {
    url += parameter;
    url += "&units=metric" + "&appid=" + import.meta.env.VITE_API_WEATHER;
  } else if (route == WEATHER_ICON_REQUEST_CODE) {
    url = ICON_LINK_URL + parameter + "@2x.png";
  }
  return url;
};
