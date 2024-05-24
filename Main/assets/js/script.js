const searchFormEl = document.querySelector('#search-form');
const apiKey = "2bc529b101f5f798eefa5145162eeb18"
const searchInputVal = document.querySelector('#search-input');
const currentDate = dayjs();

let todayForecast = {};
let day1Forecast =  {};
let day2Forecast =  {};
let day3Forecast =  {};
let day4Forecast =  {};
let day5Forecast =  {};

let city = JSON.parse(localStorage.getItem('city'));

function handleSearchFormSubmit(event) {
  event.preventDefault();

  if (!searchInputVal.value) {
    alert('You need a search input value!');
    return;
  }
  console.log(city);
  if (!city) {
    city = [];
  }
  let cityInput = searchInputVal.value;
  city.push(cityInput);
  localStorage.setItem('city', JSON.stringify(city));
  getCoords(searchInputVal);
  searchInputVal.value = "";
}

// Function to get coordinates of city entered using API
function getCoords() {
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
      console.log(data);
      todayForecast = {
        temp: (((data.main.temp)-273.15)*9/5) + 32,
        wind: data.wind.speed,
        humidity: data.main.humidity,
        icon: data.weather[0].icon
      }
     })
     .then(function () {
      renderWeatherToday();
      searchHistory();
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
      console.log(data);
      day1Forecast = {
        temp: (((data.list[7].main.temp)-273.15)*9/5) + 32,
        wind: data.list[7].wind.speed,
        humidity: data.list[7].main.humidity,
        icon: data.list[7].weather[0].icon
      };
      day2Forecast = {
        temp: (((data.list[15].main.temp)-273.15)*9/5) + 32,
        wind: data.list[15].wind.speed,
        humidity: data.list[15].main.humidity,
        icon: data.list[15].weather[0].icon
      }
      day3Forecast = {
        temp: (((data.list[23].main.temp)-273.15)*9/5) + 32,
        wind: data.list[23].wind.speed,
        humidity: data.list[23].main.humidity,
        icon: data.list[23].weather[0].icon
      };
      day4Forecast = {
        temp: (((data.list[31].main.temp)-273.15)*9/5) + 32,
        wind: data.list[31].wind.speed,
        humidity: data.list[31].main.humidity,
        icon: data.list[31].weather[0].icon
      };
      day5Forecast = {
        temp: (((data.list[39].main.temp)-273.15)*9/5) + 32,
        wind: data.list[39].wind.speed,
        humidity: data.list[39].main.humidity,
        icon: data.list[39].weather[0].icon
      };
     })
     .then(function () {
      console.log(day1Forecast);
      console.log(day2Forecast);
      console.log(day3Forecast);
      console.log(day4Forecast);
      console.log(day5Forecast);
      renderWeatherForecast()
     })
}

//Function to create card for weather today
function createWeatherTodayCard() {
  const weatherTodayCard = $('<div>');
  const cardIcon = $('<img>').attr('src', `https://openweathermap.org/img/wn/${todayForecast.icon}@2x.png`);
  const cardHeader = $('<h1>').addClass('card-header').text(searchInputVal.value + " " + currentDate.format("M/DD/YYYY"));
  const cardTemp = $('<p>').addClass('card-temp').text("Temp: " + todayForecast.temp.toFixed(2) + "°F");
  const cardWind = $('<p>').addClass('card-wind').text("Wind: " + todayForecast.wind + " MPH");
  const cardHumidity = $('<p>').addClass('card-humidity').text("Humidity:" + todayForecast.humidity + "%");
  
  weatherTodayCard.append(cardHeader, cardIcon, cardTemp, cardWind, cardHumidity);
  return weatherTodayCard;
}

//Function to create card for weather day 1
function createDay1ForecastCard() {
  const weatherDay1Card = $('<div>');
  const card1Icon = $('<img>').attr('src', `https://openweathermap.org/img/wn/${day1Forecast.icon}@2x.png`);
  const card1Header = $('<h2>').addClass('card-header').text(currentDate.add(1, 'day').format("M/DD/YYYY"));
  const card1Temp = $('<p>').addClass('card-temp').text("Temp: " + day1Forecast.temp.toFixed(2) + "°F");
  const card1Wind = $('<p>').addClass('card-wind').text("Wind: " + day1Forecast.wind + " MPH");
  const card1Humidity = $('<p>').addClass('card-humidity').text("Humidity:" + day1Forecast.humidity + "%");
  
  weatherDay1Card.append(card1Header, card1Icon, card1Temp, card1Wind, card1Humidity);
  return weatherDay1Card;
}

//Function to create card for weather day 2
function createDay2ForecastCard() {
  const weatherDay2Card = $('<div>');
  const card2Icon = $('<img>').attr('src', `https://openweathermap.org/img/wn/${day2Forecast.icon}@2x.png`);
  const card2Header = $('<h2>').addClass('card-header').text(currentDate.add(2, 'day').format("M/DD/YYYY"));
  const card2Temp = $('<p>').addClass('card-temp').text("Temp: " + day2Forecast.temp.toFixed(2) + "°F");
  const card2Wind = $('<p>').addClass('card-wind').text("Wind: " + day2Forecast.wind + " MPH");
  const card2Humidity = $('<p>').addClass('card-humidity').text("Humidity:" + day2Forecast.humidity + "%");
  
  weatherDay2Card.append(card2Header, card2Icon, card2Temp, card2Wind, card2Humidity);
  return weatherDay2Card;
}

//Function to create card for weather day 3
function createDay3ForecastCard() {
  const weatherDay3Card = $('<div>');
  const card3Icon = $('<img>').attr('src', `https://openweathermap.org/img/wn/${day3Forecast.icon}@2x.png`);
  const card3Header = $('<h2>').addClass('card-header').text(currentDate.add(3, 'day').format("M/DD/YYYY"));
  const card3Temp = $('<p>').addClass('card-temp').text("Temp: " + day3Forecast.temp.toFixed(2) + "°F");
  const card3Wind = $('<p>').addClass('card-wind').text("Wind: " + day3Forecast.wind + " MPH");
  const card3Humidity = $('<p>').addClass('card-humidity').text("Humidity:" + day3Forecast.humidity + "%");
  
  weatherDay3Card.append(card3Header, card3Icon, card3Temp, card3Wind, card3Humidity);
  return weatherDay3Card;
}

//Function to create card for weather day 4
function createDay4ForecastCard() {
  const weatherDay4Card = $('<div>');
  const card4Icon = $('<img>').attr('src', `https://openweathermap.org/img/wn/${day4Forecast.icon}@2x.png`);
  const card4Header = $('<h2>').addClass('card-header').text(currentDate.add(4, 'day').format("M/DD/YYYY"));
  const card4Temp = $('<p>').addClass('card-temp').text("Temp: " + day4Forecast.temp.toFixed(2) + "°F");
  const card4Wind = $('<p>').addClass('card-wind').text("Wind: " + day4Forecast.wind + " MPH");
  const card4Humidity = $('<p>').addClass('card-humidity').text("Humidity:" + day4Forecast.humidity + "%");
  
  weatherDay4Card.append(card4Header, card4Icon, card4Temp, card4Wind, card4Humidity);
  return weatherDay4Card;
}

//Function to create card for weather day 5
function createDay5ForecastCard() {
  const weatherDay5Card = $('<div>');
  const card5Icon = $('<img>').attr('src', `https://openweathermap.org/img/wn/${day5Forecast.icon}@2x.png`);
  const card5Header = $('<h2>').addClass('card-header').text(currentDate.add(5, 'day').format("M/DD/YYYY"));
  const card5Temp = $('<p>').addClass('card-temp').text("Temp: " + day5Forecast.temp.toFixed(2) + "°F");
  const card5Wind = $('<p>').addClass('card-wind').text("Wind: " + day5Forecast.wind + " MPH");
  const card5Humidity = $('<p>').addClass('card-humidity').text("Humidity:" + day5Forecast.humidity + "%");
  
  weatherDay5Card.append(card5Header, card5Icon, card5Temp, card5Wind, card5Humidity);
  return weatherDay5Card;
}

//Function to render weather for today
function renderWeatherToday() {
  $("#today").html("");
  const weatherTodayCard = createWeatherTodayCard();
  $("#today").append(weatherTodayCard);
}

//Function to render weather forecast
function renderWeatherForecast() {
  $("#day-1").html("");
  const weatherDay1Card = createDay1ForecastCard();
  $("#day-1").append(weatherDay1Card);

  $("#day-2").html("");
  const weatherDay2Card = createDay2ForecastCard();
  $("#day-2").append(weatherDay2Card);

  $("#day-3").html("");
  const weatherDay3Card = createDay3ForecastCard();
  $("#day-3").append(weatherDay3Card);

  $("#day-4").html("");
  const weatherDay4Card = createDay4ForecastCard();
  $("#day-4").append(weatherDay4Card);

  $("#day-5").html("");
  const weatherDay5Card = createDay5ForecastCard();
  $("#day-5").append(weatherDay5Card);
}

function searchHistory() {
  $("#search-history").html("");
  for (const c of city) {
    const searchHistoryCity = $("<button>");
    searchHistoryCity.text(c).addClass("btn btn-info btn-block custom-btn");
    $("#search-history").append(searchHistoryCity);
    searchHistoryCity.on('click', function (event) {
      event.preventDefault();
      $("#search-input").val(c);
      getCoords(c); 
    });
  }
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);
