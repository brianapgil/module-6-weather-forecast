const searchFormEl = document.querySelector('#search-form');
const apiKey = "2bc529b101f5f798eefa5145162eeb18"
const searchInputVal = document.querySelector('#search-input');

let todayForecast = {};
let day1Forecast =  {};
let day2Forecast =  {};
let day3Forecast =  {};
let day4Forecast =  {};
let day5Forecast =  {};

function handleSearchFormSubmit(event) {
  event.preventDefault();

  if (!searchInputVal.value) {
    console.error('You need a search input value!');
    return;
  }

  getCoords(searchInputVal);

}

// Function to get coordinates of city entered using API
function getCoords(searchInputVal) {
  const city = searchInputVal.value;
  console.log(city);
  const apiUrlCoords = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`
  console.log(apiUrlCoords);

  fetch(apiUrlCoords)
    .then(function (res) {

      return res.json();
    })
    .then(function (data) {
      console.log(data);
      getWeatherToday(data[0]);
      getWeatherForecast(data[0]);
    })
}

// Function to get today's weather of city based on coordinates using API and add data to object
function getWeatherToday(geo) {
  console.log(geo);
  let latitude = geo.lat;
  let longitude = geo.lon;
  console.log(latitude);
  console.log(longitude);
  const apiUrlToday = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
  console.log(apiUrlToday);

  fetch(apiUrlToday)
     .then(function (res) {

       return res.json();
     })
     .then(function (data) {
      todayForecast = {
        temp: (((data.main.temp)-273.15)*9/5) + 32,
        wind: data.wind.speed,
        humidity: data.main.humidity
      }
     })
     .then(function () {
      console.log(todayForecast)
      renderWeather();
     })
}



 // Function to get 5 day forecast of city based on coordinates using API and add data to objects
 function getWeatherForecast(geo) {
  console.log(geo);
  let latitude = geo.lat;
  let longitude = geo.lon;
  const apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
  console.log(apiUrlForecast);

  fetch(apiUrlForecast)
     .then(function (res) {

       return res.json();
     })
     .then(function (data) {
      day1Forecast = {
        temp: (((data.list[7].main.temp)-273.15)*9/5) + 32,
        wind: data.list[7].wind.speed,
        humidity: data.list[7].main.humidity
      };
      day2Forecast = {
        temp: (((data.list[15].main.temp)-273.15)*9/5) + 32,
        wind: data.list[15].wind.speed,
        humidity: data.list[15].main.humidity
      }
      day3Forecast = {
        temp: (((data.list[23].main.temp)-273.15)*9/5) + 32,
        wind: data.list[23].wind.speed,
        humidity: data.list[23].main.humidity
      };
      day4Forecast = {
        temp: (((data.list[31].main.temp)-273.15)*9/5) + 32,
        wind: data.list[31].wind.speed,
        humidity: data.list[31].main.humidity
      };
      day5Forecast = {
        temp: (((data.list[39].main.temp)-273.15)*9/5) + 32,
        wind: data.list[39].wind.speed,
        humidity: data.list[39].main.humidity
      };
     })
     .then(function () {
      console.log(day1Forecast);
      console.log(day2Forecast);
      console.log(day3Forecast);
      console.log(day4Forecast);
      console.log(day5Forecast);
      renderWeather();
     })
}


function createWeatherTodayCard() {
  const weatherTodayCard = $('<div>')
  const cardHeader = $('<h1>').addClass('card-header').text(searchInputVal);
  const cardTemp = $('<p>').addClass('card-temp').text(todayForecast.temp);
  const cardWind = $('<p>').addClass('card-temp').text(todayForecast.wind);
  const cardHumidity = $('<p>').addClass('card-temp').text(todayForecast.humidity);
  
  weatherTodayCard.append(cardHeader, cardTemp, cardWind, cardHumidity);
  return weatherTodayCard;
}

function renderWeather() {
  const weatherTodayCard = createWeatherTodayCard();
  $("#today").append(weatherTodayCard);
}


searchFormEl.addEventListener('submit', handleSearchFormSubmit);

