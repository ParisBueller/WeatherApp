//Store global variables
const url = "https://fcc-weather-api.glitch.me/api/current?";
let lat, lon;
let temperatureInCelsius;
let temperatureInFahrenheit;

//Get Current Position (latitude/longitude)
$(document).ready(() => {
if(navigator.geolocation) { 
  navigator.geolocation.getCurrentPosition((position) => { 
     lat = "lat=" + position.coords.latitude;
     lon = "lon=" + position.coords.longitude;
     getWeather(lat,lon);                                                      
    });
  } else{
      error("This Browser does not support geolocation");
  }
}) 

//Concatenate weather api with latitude and longitude
function getWeather(lat,lon) {
  let apiString = url + lat + "&" + lon;
  //Make ajax call and store response in variables
    $.ajax({
      url: apiString, success: (response) => {  
        let city= response.name;
        let temperature = Math.round(response.main.temp);
        let description = response.weather[0].description;
        let icon = response.weather[0].icon;
        //Manipulation of HTML elements with JQuery
        $("#city").html(city);
        $("#temperature").html(temperature + "°");
        $("#description").html(description);
        $("#icon").attr('src',icon);
       temperatureInCelsius = temperature;
       temperatureInFahrenheit = Math.round(temperature * 9 / 5 + 32);        
       changeTemperatureUnit(temperatureInCelsius,temperatureInFahrenheit);
    }
  });
}
//Convert Celsius to Fahrenheit
function changeTemperatureUnit(temperatureInCelsius,temperatureInFahrenheit){
$("#temperatureUnit").click(() => {
  let currentTemperatureUnit = $("#temperatureUnit").html();
  let changedTemperatureUnit = currentTemperatureUnit == 'C' ? 'F' : 'C';
    $("#temperatureUnit").html(changedTemperatureUnit);
      if(
        changedTemperatureUnit == 'F')
        $("#temperature").html(temperatureInFahrenheit + "°");
        else{
           $("#temperature").html(temperatureInCelsius + "°");
     }
  })
}
  