function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInputElement.value;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function searchCity(city) {
  let apiKey = "o1cfacc0a9aa5038bce80c403dc4abt1";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function formatDate(date) {
  let minutes = now.getMinutes();
  let hours = now.getHours();
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
  let day = days[now.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let headingElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#date-time-paragraph");
  let physicsElement = document.querySelector("#physics");
  let iconUrlElement = document.querySelector("#current-icon");

  let temperature = Math.round(response.data.temperature.current);
  let city = response.data.city;
  let description = response.data.conditions.description;
  let humidity = response.data.temperature.humidity;
  let wind = Math.round(response.data.wind.speed);
  let iconUrl = response.data.condition.icon;

  temperatureElement.innerHTML = `${temperature}`;
  headingElement.innerHTML = `${city}`;
  descriptionElement.innerHTML = 
}
