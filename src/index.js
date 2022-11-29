function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursaday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Tomorrow", "Thursday", "Friday", "Saturday", "Sunday"];
  let forecastHTML = "";
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `  <ul class="weather-list">
            <li class="forecast-date">${day}</li>
            <img
            src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png"
            alt="" id="forecast-icon" />
            <li class="forecast-temp">11/23℃</li>
          </ul>
          `;
  });
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function showTemp(response) {
  document.querySelector("#current-date").innerHTML = formatDate(
    response.data.time * 1000
  );
  celsiusTemp = response.data.temperature.current;
  document.querySelector(".chosen-city").innerHTML = response.data.city;
  document.querySelector("#current-temp").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#weather-description").innerHTML =
    response.data.condition.description;
  document
    .querySelector("#current-weather-icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  getForecast(response.data.coordinates);
}
function searchCity(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(".city-field").value;
  searchCity(city);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
function getGeolocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  document.querySelector("#current-temp").innerHTML =
    Math.round(fahrenheitTemp);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function showCelsiusTemp(event) {
  event.preventDefault();
  document.querySelector("#current-temp").innerHTML = Math.round(celsiusTemp);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

function searchCityLondon() {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=london&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function searchCityWarsaw() {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=warsaw&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function searchCityKyiv() {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=kyiv&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function searchCityLisbon() {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=lisbon&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

let cityForm = document.querySelector(".city-form");
cityForm.addEventListener("submit", handleSubmit);

let locationLink = document.querySelector("#location-link");
locationLink.addEventListener("click", getGeolocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

let londonLink = document.querySelector("#london-link");
londonLink.addEventListener("click", searchCityLondon);

let warsawLink = document.querySelector("#warsaw-link");
warsawLink.addEventListener("click", searchCityWarsaw);

let kyivLink = document.querySelector("#kyiv-link");
kyivLink.addEventListener("click", searchCityKyiv);

let lisbonLink = document.querySelector("#lisbon-link");
lisbonLink.addEventListener("click", searchCityLisbon);

let celsiusTemp = null;
let apiKey = "81ob2btf7e18f4e07031046ab12afce1";

searchCity("Kyiv");
