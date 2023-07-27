// api key
const Api = "484729e03e78f98e8ec7c9bd65241f94";

// Today weather condition DOM elements
const userCity = document.getElementById("user-city");
const userCountry = document.getElementById("user-country");
const todayTemp = document.getElementById("today-temp");
const todayWeather = document.getElementById("today-weather-condition");
const todayHigh = document.getElementById("today-high");
const todayLow = document.getElementById("today-low");
const todaySunrise = document.getElementById("today-sunrise");
const todaySunset = document.getElementById("today-sunset");
const todayHumidity = document.getElementById("today-humidity");
const todayWindS = document.getElementById("today-windS");
const todayWindD = document.getElementById("today-windD");
const todayFeels = document.getElementById("today-feels");
const todayPressure = document.getElementById("today-pressure");
const todayWeatherIcon = document.getElementById("weather-icon");

// Tomorrow weather condition DOM elements
const tomorrowTemp = document.getElementById("tomorrow-temp");
const tomorrowWeather = document.getElementById("tomorrow-weather-condition");
const tomorrowHigh = document.getElementById("tomorrow-high");
const tomorrowLow = document.getElementById("tomorrow-low");
const tomorrowSunrise = document.getElementById("tomorrow-sunrise");
const tomorrowSunset = document.getElementById("tomorrow-sunset");
const tomorrowHumidity = document.getElementById("tomorrow-humidity");
const tomorrowWindS = document.getElementById("tomorrow-windS");
const tomorrowWindD = document.getElementById("tomorrow-windD");
const tomorrowFeels = document.getElementById("tomorrow-feels");
const tomorrowPressure = document.getElementById("tomorrow-pressure");
const tomorrowWeatherIcon = document.getElementById("tomorrow-weather-icon");

// day After Tomorrow weather condition DOM elements
const dayThreeTemp = document.getElementById("dayThree-temp");
const dayThreeWeather = document.getElementById("dayThree-weather-condition");
const dayThreeHigh = document.getElementById("dayThree-high");
const dayThreeLow = document.getElementById("dayThree-low");
const dayThreeSunrise = document.getElementById("dayThree-sunrise");
const dayThreeSunset = document.getElementById("dayThree-sunset");
const dayThreeHumidity = document.getElementById("dayThree-humidity");
const dayThreeWindS = document.getElementById("dayThree-windS");
const dayThreeWindD = document.getElementById("dayThree-windD");
const dayThreeFeels = document.getElementById("dayThree-feels");
const dayThreePressure = document.getElementById("dayThree-pressure");
const dayThreeWeatherIcon = document.getElementById(
  "dayAfterTomorrow-weather-icon"
);

// Getting the search input and search button elements
const searchInput = document.getElementById("searchquerry");
const searchButton = document.getElementById("search-btn");

// Add event listener to the pressed enter key
searchInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    searchWeatherByCity();
  }
});

// Add event listener to the search button
searchButton.addEventListener("click", searchWeatherByCity);

// Function to fetch weather data based on the entered city name
function searchWeatherByCity() {
  const searchCity = searchInput.value;
  fetchAndDisplayCurrentWeather(searchCity);
  fetchAndDisplayTomorrowWeather(searchCity);
  fetchAndDisplayDayThreeWeather(searchCity);
}

function defaultTemp(city = "New York", country = "US") {
  fetchAndDisplayCurrentWeather(city);
  fetchAndDisplayTomorrowWeather(city);
  fetchAndDisplayDayThreeWeather(city);
  userCity.innerHTML = `${city} ,`;
  userCountry.innerHTML = country;
}

defaultTemp("New York", "Us");

// Getting the user's current location by geolocation coords
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
} else {
  console.log("Geolocation is not supported in this browser.");
  const defaultCity = "New York";
  const defaultCountry = "Us";
  fetchAndDisplayCurrentWeather(defaultCity);
  fetchAndDisplayTomorrowWeather(defaultCity);
  fetchAndDisplayDayThreeWeather(defaultCity);
  userCity.innerHTML = `${defaultCity} ,`;
  userCountry.innerHTML = defaultCountry;
}

// Success callback for geolocation
function successCallback(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const geocoding_Url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${Api}`;

  fetch(geocoding_Url)
    .then((res) => res.json())
    .then((data) => {
      const state = data[0].state;
      userCity.innerHTML = `${state},`;
      userCountry.innerHTML = data[0].country;

      // Fetch and display current weather data
      fetchAndDisplayCurrentWeather(state);
      fetchAndDisplayTomorrowWeather(state);
      fetchAndDisplayDayThreeWeather(state);
      const featchLocationBtn = document.getElementById("location-btn");
      featchLocationBtn.addEventListener("click", () => {
        fetchAndDisplayCurrentWeather(state);
        fetchAndDisplayTomorrowWeather(state);
        fetchAndDisplayDayThreeWeather(state);
      });
    })
    .catch((error) => {
      console.error("Error fetching city data:", error);
    });
}

// Error callback for geolocation
function errorCallback(error) {
  console.error("Error getting location:", error.message);
  const defaultCity = "New York";
  const defaultCountry = "Us";
  fetchAndDisplayCurrentWeather(defaultCity);
  userCity.innerHTML = `${defaultCity} ,`;
  userCountry.innerHTML = defaultCountry;
}

// Function to fetch and display current weather data
function fetchAndDisplayCurrentWeather(cityName) {
  const weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${Api}`;

  fetch(weather_url)
    .then((res) => res.json())
    .then((weather_Data) => {
      // Update the UI with the weather data
      todayTemp.innerHTML = `${Math.floor(
        weather_Data.main.temp - 272.15
      )}&deg;C`;
      todayWeather.innerHTML = weather_Data.weather[0].main;
      todayHigh.innerHTML = `${Math.floor(
        weather_Data.main.temp_max - 272.15
      )}&deg;C`;
      todayLow.innerHTML = `${Math.floor(
        weather_Data.main.temp_min - 272.15
      )}&deg;C`;
      todaySunrise.innerHTML = new Date(
        weather_Data.sys.sunrise * 1000
      ).toLocaleTimeString();
      todaySunset.innerHTML = new Date(
        weather_Data.sys.sunset * 1000
      ).toLocaleTimeString();
      todayHumidity.innerHTML = `${weather_Data.main.humidity} %`;
      todayWindS.innerHTML = `${Math.round(weather_Data.wind.speed)} m/s`;
      todayWindD.innerHTML = `${weather_Data.wind.deg}&deg;`;
      todayFeels.innerHTML = `${Math.floor(
        weather_Data.main.feels_like - 272.15
      )}&deg;C`;
      todayPressure.innerHTML = `${weather_Data.main.pressure} hPa`;
      todayWeatherIcon.src = `${weather_Data.weather[0].icon}.png`;

      userCountry.innerHTML = weather_Data.sys.country;
      userCity.innerHTML = `${weather_Data.name} ,`;
    });
}

// Function to filter data for tomorrow
function filterTomorrowWeather(weatherData) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = tomorrow.toISOString().slice(0, 10);

  const tomorrowWeatherData = weatherData.filter((data) =>
    data.dt_txt.startsWith(tomorrowDate)
  );
  return tomorrowWeatherData;
}

// Function to fetch and display tomorrow's weather data
function fetchAndDisplayTomorrowWeather(cityName) {
  const weather_url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${Api}`;

  fetch(weather_url)
    .then((res) => res.json())
    .then((weather_Data) => {
      const filteredData = filterTomorrowWeather(weather_Data.list);
      // Now you can update the UI with the filtered data for tomorrow's weather.
      tomorrowTemp.innerHTML = `${Math.floor(
        filteredData[4].main.temp - 272.15
      )}&deg;C`;
      tomorrowWeather.innerHTML = filteredData[4].weather[0].main;
      tomorrowHigh.innerHTML = `${Math.floor(
        filteredData[4].main.temp_max - 272.15
      )}&deg;C`;
      tomorrowLow.innerHTML = `${Math.floor(
        filteredData[4].main.temp_min - 272.15
      )}&deg;C`;
      tomorrowHumidity.innerHTML = `${filteredData[4].main.humidity} %`;
      tomorrowWindS.innerHTML = `${Math.round(filteredData[4].wind.speed)} m/s`;
      tomorrowWindD.innerHTML = `${filteredData[4].wind.deg}&deg;`;
      tomorrowFeels.innerHTML = `${Math.floor(
        filteredData[4].main.feels_like - 272.15
      )}&deg;C`;
      tomorrowPressure.innerHTML = `${filteredData[4].main.pressure} hPa`;
      tomorrowWeatherIcon.src = `${filteredData[4].weather[0].icon}.png`;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

// Function to filter data for day after tomorrow
function filterDayThreeWeather(weatherData) {
  const dayThree = new Date();
  dayThree.setDate(dayThree.getDate() + 2);
  const dayThreeDate = dayThree.toISOString().slice(0, 10);

  const dayThreeWeatherData = weatherData.filter((data) =>
    data.dt_txt.startsWith(dayThreeDate)
  );
  return dayThreeWeatherData;
}

function fetchAndDisplayDayThreeWeather(cityName) {
  const weather_url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${Api}`;

  fetch(weather_url)
    .then((res) => res.json())
    .then((weather_Data) => {
      const filteredData = filterDayThreeWeather(weather_Data.list);
      dayThreeTemp.innerHTML = `${Math.floor(
        filteredData[4].main.temp - 272.15
      )}&deg;C`;
      dayThreeWeather.innerHTML = filteredData[4].weather[0].main;
      dayThreeHigh.innerHTML = `${Math.floor(
        filteredData[4].main.temp_max - 272.15
      )}&deg;C`;
      dayThreeLow.innerHTML = `${Math.floor(
        filteredData[4].main.temp_min - 272.15
      )}&deg;C`;
      dayThreeHumidity.innerHTML = `${filteredData[4].main.humidity} %`;
      dayThreeWindS.innerHTML = `${Math.round(filteredData[4].wind.speed)} m/s`;
      dayThreeWindD.innerHTML = `${filteredData[4].wind.deg}&deg;`;
      dayThreeFeels.innerHTML = `${Math.floor(
        filteredData[4].main.feels_like - 272.15
      )}&deg;C`;
      dayThreePressure.innerHTML = `${filteredData[4].main.pressure} hPa`;
      dayThreeWeatherIcon.src = `${filteredData[4].weather[0].icon}.png`;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

const time = document.getElementById("time");
const day = document.getElementById("day");
setInterval(() => {
  const current_Date = new Date();
  const current_Time = current_Date.toLocaleTimeString();
  time.innerHTML = current_Time;
  const currentDay = current_Date.getDay();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  day.innerHTML = daysOfWeek[currentDay];
}, 1000);

// Selecting other country weather elements
const otherCountry = document.getElementsByClassName("other-country");
const otherLargeCity = document.getElementsByClassName("other-large-city");
const otherCityTemp = document.getElementsByClassName("other-city-temp");
const otherCityWeatherIcon = document.getElementsByClassName(
  "other-city-weather-icon"
);
function fetchWeatherOtherLargeCity(otherCityName, index = "0") {
  const weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${otherCityName}&appid=${Api}`;
  fetch(weather_url)
    .then((res) => res.json())
    .then((data) => {
      // Update the UI with the weather data
      otherCountry[index].innerHTML = data.sys.country;
      otherLargeCity[index].innerHTML = data.name;
      otherCityTemp[index].innerHTML = `${Math.floor(
        data.main.temp - 272.15
      )}&deg;C`;
      otherCityWeatherIcon[index].src = `${data.weather[0].icon}.png`;
    })
    .catch((error) => {
      // Handle the error if the fetch fails
      console.error("Error fetching weather data:", error);
      // You might want to display an error message in the UI or take other actions here.
    });
}

// Fetch weather data for other large cities
fetchWeatherOtherLargeCity("Dubai", 0);
fetchWeatherOtherLargeCity("New York", 1);
fetchWeatherOtherLargeCity("London", 2);

// adding active class for current active weather info

// selecting btns for showing weather card
const btnGroup = document.querySelectorAll(".btn-group button");

btnGroup.forEach((btn) => {
  btn.addEventListener("click", () => {
    // remove active class from all btn
    btnGroup.forEach((btn) => {
      btn.classList.remove("active");
    });
    // add active link on click

    btn.classList.add("active");
  });
});

const todayBtn = btnGroup[0];
const tomorrowBtn = btnGroup[1];
const dayThreeBtn = btnGroup[2];

// selecting all weather cards from dom

const WeatherCard = document.getElementsByClassName("weather-card");

todayBtn.addEventListener("click", () => {
  WeatherCard[0].classList.add("active");
  WeatherCard[1].classList.remove("active");
  WeatherCard[2].classList.remove("active");
  WeatherCard[1].style.display = "none";
  WeatherCard[2].style.display = "none";
});

tomorrowBtn.addEventListener("click", () => {
  WeatherCard[1].classList.add("active");
  WeatherCard[0].classList.remove("active");
  WeatherCard[2].classList.remove("active");
  WeatherCard[1].style.display = "block";
  WeatherCard[2].style.display = "none";
});

dayThreeBtn.addEventListener("click", () => {
  WeatherCard[2].classList.add("active");
  WeatherCard[1].classList.remove("active");
  WeatherCard[0].classList.remove("active");
  WeatherCard[1].style.display = "block";
  WeatherCard[2].style.display = "block";
});
