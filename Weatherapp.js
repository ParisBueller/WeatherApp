//Store global variables
var url = "https://fcc-weather-api.glitch.me/api/current?";
var lat, lon;
var temperatureUnit ='C';
var temperatureInCelsius;
var temperatureInFahrenheit;

//Get Current Position (latitude/longitude)
$(document).ready(function(){
if(navigator.geolocation) { 
  navigator.geolocation.getCurrentPosition(function(position){ 
     lat = "lat=" + position.coords.latitude;
     lon = "lon=" + position.coords.longitude;
     getWeather(lat,lon);                                                      
    });
  } else{
      console.log("This Browser does not support geolocation");
  }
}) 

//Concatenate weather api with latitude and longitude
function getWeather(lat,lon) {
  var apiString = url + lat + "&" + lon;
  console.log(apiString)
  //Make ajax call and store response in variables
    $.ajax({
      url: apiString, success: function(response) {  
        var city= response.name;
        var temperature = Math.round(response.main.temp);
        var description = response.weather[0].description;
        var icon = response.weather[0].icon;
        //Manipulation of HTML elements with JQuery
        $("#city").html(city);
        $("#temperature").html(temperature + "°");
        $("#description").html(description);
        $("#icon").attr('src',icon);
       temperatureInCelsius = temperature;
       temperatureInFahrenheit = Math.round(temperature * 9 / 5 + 32);        changeTemperatureUnit(temperatureInCelsius,temperatureInFahrenheit);
    }
  });
}
//Convert Celsius to Fahrenheit
function changeTemperatureUnit(temperatureInCelsius,temperatureInFahrenheit){
$("#temperatureUnit").click(function(){
  var currentTemperatureUnit = $("#temperatureUnit").html();
  var changedTemperatureUnit = currentTemperatureUnit == 'C' ? 'F' : 'C';
    $("#temperatureUnit").html(changedTemperatureUnit);
      if(
        changedTemperatureUnit == 'F')
        $("#temperature").html(temperatureInFahrenheit + "°");
        else{
           $("#temperature").html(temperatureInCelsius + "°");
     }
  })
}