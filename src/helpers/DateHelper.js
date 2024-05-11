import { MONTHS_ARRAY } from "../constant/WeatherConstants";

export const DateHelper = (parameter, formatType) => {
  const month = MONTHS_ARRAY;
  var newDateUsingPrams = new Date(parameter * 1000);

  var hours = newDateUsingPrams.getHours();
  var minutes = newDateUsingPrams.getMinutes();

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  var addFormatType = "";
  if (formatType == 2) {
    addFormatType =
      month[newDateUsingPrams.getMonth()] + " " + newDateUsingPrams.getDate();
  }

  return (
    hours +
    "." +
    minutes +
    " " +
    newDateUsingPrams.toLocaleTimeString().split(" ")[1] +
    " " +
    addFormatType
  );
};
