// Reference HTML elements.
let cityNameEl = document.getElementById("city-name");
let temperatureEl = document.getElementById("temperature");
let humidityEl = document.getElementById("humidity");
let windSpeedEl = document.getElementById("wind-speed");
let uvIndexEl = document.getElementById("uv-index");
let searchBarEl = document.getElementById("search-bar");
let searchButton = document.getElementById("search-btn");
let fiveDayForecastEl = document.getElementById("five-day-forecast");
let searchHistoryEl = document.getElementById("search-history");

// Make an API call for temperature, humidity, and wind speed. Also make a call for latitude and longitude to be used in a call for UV Index.
function callApi() {
  // Get the name of the city.
  let cityName = searchBarEl.value;

  // Make a call to API to get current weather data
  // cityNameEl.textContent = `${cityName.toUpperCase()}`;
  // let currentDataUrl = `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${cityName}&appid=a4bf23428ce5ff544bccc01776c56dca&units=metric`;
  // fetch(currentDataUrl)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data)
  //   })


  // Make a call to API that gets basic weather data and push it onto the screen.
  let url1 = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a4bf23428ce5ff544bccc01776c56dca&units=metric`;
  fetch(url1)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      let tempCelsius = data.main.temp.toFixed(0);
      let humidity = data.main.humidity;
      let windSpeed = data.wind.speed;
      let latitude = data.coord.lat;
      let longitude = data.coord.lon;
      temperatureEl.textContent = `Temperature: ${tempCelsius} °C`;
      humidityEl.textContent = `Humidity: ${humidity}%`;
      windSpeedEl.textContent = `Wind speed: ${windSpeed} MPH`;

      //Forecast cards function and call to 5 day forecast API will go here.
      let url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=a4bf23428ce5ff544bccc01776c56dca&units=metric`;
      fetch(url2)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          let forecastObj = data;
          // Define a nested function that creates a forecast card and populates it for each of the 5 days.
          let iterator = 5;
          function createForecastCard() {
            let date = forecastObj.list[iterator].dt_txt.substr(0, 10);
            let temp = forecastObj.list[iterator].main.temp.toFixed(0);
            let hum = forecastObj.list[iterator].main.humidity;
            let icon = forecastObj.list[iterator].weather[0].icon;
            const cardHTML = `
              <div class="card text-white bg-primary mb-2"
                style="max-width: 300px; max-height: 200px; margin-left: 15px; margin-right: 15px;">
                <h6 class="card-header forecast-date">${date}</h6>
                <img src="https://openweathermap.org/img/w/${icon}.png" alt="weather icon" class="forecast-weather-image" />
                <div class="card-body">
                  <p class="forecast-temperature">Temp: ${temp} °C</p>
                  <p class="forecast-humidity">Hum: ${hum}%</p>
                </div>
              </div>`;
            fiveDayForecastEl.innerHTML += cardHTML;
            iterator += 8;
          }
          // Clear any existing cards form the screen.
          fiveDayForecastEl.innerHTML = "";
          for (let i = 0; i < 5; i++) {
            createForecastCard();
          }
        });

      // Make a call to API that gets UV data and push it onto the screen.
      let url3 = `https://api.openweathermap.org/data/2.5/uvi?appid=a4bf23428ce5ff544bccc01776c56dca&lat=${latitude}&lon=${longitude}`;
      fetch(url3)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          let uvIndex = data.value;
          if (uvIndex <= 2) {
            uvIndexEl.innerHTML = `UV index: <mark id="green">${uvIndex}</mark>`;
          } else if (uvIndex > 2 && uvIndex <= 5) {
            uvIndexEl.innerHTML = `UV index: <mark id="yellow">${uvIndex}</mark>`;
          } else if (uvIndex > 5 && uvIndex <= 7) {
            uvIndexEl.innerHTML = `UV index: <mark id="orange">${uvIndex}</mark>`;
          } else if (uvIndex > 7 && uvIndex <= 10) {
            uvIndexEl.innerHTML = `UV index: <mark id="red">${uvIndex}</mark>`;
          } else {
            uvIndexEl.innerHTML = `UV index: <mark id="purple">${uvIndex}</mark>`;
          }
          addSearchHistory();
          // The following code accounts for the creation of empty elements when an invalid value is entered into search. The element is removed.
          if (searchHistoryEl.firstElementChild.textContent === "") {
            searchHistoryEl.firstChild.remove();
          }
          // Clear the input field.
          searchBarEl.value = "";
        });
    });
}

// Define a function that adds an entry in "Recent Searches" each time a search is made.
function addSearchHistory() {
  const searchResult = `<li class="list-group-item history-button">${searchBarEl.value}</li>`;
  searchHistoryEl.insertAdjacentHTML("afterbegin", searchResult);
  let btnList = document.getElementsByClassName("history-button");
  for (i = 0; i < btnList.length; i++) {
    btnList[i].addEventListener("click", callbackAPI);
  }
}

// Define a click event for the search button that makes a call to the API.
searchButton.addEventListener("click", function () {
  if (searchBarEl.value === "") {
    return;
  }
  callApi();
});

// Define a function that calls the API on search result clicks.
function callbackAPI(event) {
  searchBarEl.value = event.target.textContent;
  callApi();
  searchBarEl.value = "";
}
