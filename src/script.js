function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");

  // Capitalize first letter, make the rest lowercase:
  let formattedCity = searchInputElement.value
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalizes first letter of each word

  cityElement.innerHTML = formattedCity;

  let apiKey = "o1cfacc0a9aa5038bce80c403dc4abt1";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInputElement.value}&key=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then((response) => {
      displayTemperature(response);
      getForecast(response.data.city);
    }) //This ensures we use the correct city name from the API response.
    .catch(() => {
      alert("City not found. Please check the spelling!");
    });
}
function getForecast(city) {
  let apiKey = "o1cfacc0a9aa5038bce80c403dc4abt1";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayforecast);

  console.log(city);
}
function displayforecast(response) {
  console.log(response.data);

  let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Satday",
  ];
  let forecastDays = "";
  let forecastTemperature = "";
  let forecastIcons = "";

  response.data.daily.forEach(function (day) {
    let maxTemp = Math.round(day.temperature.maximum);
    let minTemp = Math.round(day.temperature.minimum);
    let iconUrl = day.condition.icon_url;

    forecastDays += `<div class="weather-forecast-date">${new Date(
      day.time * 1000
    ).toLocaleDateString("en-US", { weekday: "long" })}</div>`; //This converts UNIX timestamp (day.time) into a proper day name.

    forecastTemperature += `<div class="weather-forecast-temperature">
              <span class="weather-forecast-temperature-max">${maxTemp}°</span>
              <span class="weather-forecast-temperature-min">${minTemp}°</span>
              </div>`;
    forecastIcons += `<div class="weather-forecast-icon"><img src="${iconUrl}" class="forecast-icon" width="50"></div>`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = `
  <div class="forecast-column">${forecastDays}</div>
  <div class="forecast-column">${forecastTemperature}</div>
  <div class="forecast-column">${forecastIcons}</div>`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day}, ${date.getDate()}.${
    date.getMonth() + 1
  }.${date.getFullYear()}, ${hours}:${minutes}`;
}

function displayTemperature(response) {
  console.log(response.data); // debugging to check the API response
  let temperatureElement = document.querySelector("#current-temperature");
  let headingElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#weather-description");
  let physicsElement = document.querySelector("#physics");
  let iconElement = document.querySelector("#current-icon");
  let dateElement = document.querySelector("#date-time-paragraph");

  let temperature = Math.round(response.data.temperature.current);
  let city = response.data.city;
  let description = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let wind = Math.round(response.data.wind.speed);
  let iconUrl = response.data.condition.icon_url;

  temperatureElement.innerHTML = `${temperature}`;
  headingElement.innerHTML = `${city}`;
  descriptionElement.innerHTML = `${description} with a temperature of`;
  physicsElement.innerHTML = `Humidity: <strong>${humidity}%</strong> <br /> Wind: <strong>${wind} km/h </strong>`;
  iconElement.innerHTML = `<img src="${iconUrl}" alt="${description}" width="90px"/>`;
  dateElement.innerHTML = formatDate(new Date());

  getForecast(response.data.city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateEelement = document.querySelector("#current-date");

//Load vienna by default
let apiKey = "o1cfacc0a9aa5038bce80c403dc4abt1";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Vienna&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
