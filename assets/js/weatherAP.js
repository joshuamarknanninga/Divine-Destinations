function getWeather() {
  const weatherApiKey = `13c48558bfbb852ffb3f533f282ee2d2`;
  const weatherCity = document.getElementById(`weatherCity`).value;

  if (!weatherCity) {
    alertåEnter City");
    return;
  }

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${weatherCity}&appid=${weatherApiKey}`;
  const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${weatherCity}&appid=${weatherApiKey}`;

  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error("Error fetching weather data", error);
      alert("Unable to fetch weather data. Please try again later.");
    });

  fetch(forecastWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      displayHourForecast(data.list);
    })
    .catch((error) => {
      console.error("Error fetching forecast data", error);
    });
}

function displayWeather(data) {
  const tempDivInfo = document.getElementById(`temp-div`);
  const weatherInfoDiv = document.getElementById(`weather-info`);
  const weatherAP_icon = document.getElementById(`weatherAP_icon`);

  if (!tempDivInfo || !weatherInfoDiv || !weatherAP_icon) {
    console.error("Required elements are missing in the HTML.");
    return;

    tempDivInfo.innerHTML = "";
    weatherInfoDiv.innerHTML = "";

    if (data.cod === "404") {
      weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
      const cityName = data.name;
      const temperature = Math.round(data.main.temp - 273.15);
      const description = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

      const temperatureHTML = `<p>${temperature}°F</p>`;
      const weatherHtml = `<p>${cityName}</p> <p>${description}</p>`;

      tempDivInfo.innerHTML = temperatureHTML;
      weatherInfoDiv.innerHTML = weatherHtml;
      weatherAP_icon.src = iconUrl;
      weatherAP_icon.alt = description;

      showImage();
    }
  }
}
// made a { change above
function displayHourForecast(hourlyData) {
  const hourlyForecastDiv = document.getElementById(`hourly-forecast`);

  if (!hourlyForecastDiv) {
    console.error("Hourly forecast div is missing in the HTML.");
    return;
  }

  hourlyForecastDiv.innerHTML = ""; // Should clear previous content

  const next24hours = hourlyData.slice(0, 8);

  next24hours.forEach((item) => {
    const dateTime = new Date(item.dt * 1000);
    const hour = dateTime.getHours();
    const temperature = Math.round(item.main.temp - 273.15);
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const hourlyItemHtml = `
          <div class="hourly-item">
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt="Hourly Weather Icon">
            <span>${temperature}°F</span>
          </div>
        `;
    hourlyForecastDiv.innerHTML += hourlyItemHtml;
  });
}

function showImage() {
  const weatherAP_icon = document.getElementById(`weatherAP_icon`);
  if (weatherAP_icon) {
    weatherAP_icon.style.display = `block`;
  }
}
