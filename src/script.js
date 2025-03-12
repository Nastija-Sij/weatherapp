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
    .then(displayTemperature)
    .catch(() => {
      alert("City not found. Please check the spelling!");
    });
}

function displayforecast() {
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

  days.forEach(function (day) {
    forecastDays += `<div class="weather-forecast-date">${day}</div>`;
    forecastTemperature += `<div class="weather-forecast-temperature">
              <span class="weather-forecast-temperature-max">18°</span>
              <span class="weather-forecast-temperature-min">12°</span>
              </div>`;
    forecastIcons += `<div class="weather-forecast-icon">🌤</div>`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = `
  <div class="forecast-column">${forecastDays}</div>
  <div class="forecast-column">${forecastTemperature}</div>
  <div class="forecast-column">${forecastIcons}</div>`;
}
displayforecast();

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
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateEelement = document.querySelector("#current-date");

//Load vienna by default
let apiKey = "o1cfacc0a9aa5038bce80c403dc4abt1";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Vienna&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
