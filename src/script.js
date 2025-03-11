console.log("Axios Object:", axios);

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInputElement.value;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function displayTemperature(response) {
  console.log(response.data);
}
console.log("Checking if Axios is available:", typeof axios);

let city = "Vienna";
let apiKey = "o1cfacc0a9aa5038bce80c403dc4abt1";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

console.log("Axios Object:", axios);

axios.get(apiUrl);
