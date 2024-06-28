document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('searchButton').addEventListener('click', () => {
      const city = document.getElementById('city').value.trim();
      if (!city) {
          showModal('Please enter a city name');
          return;
      }
      fetchWeather(city);
  });

  document.getElementById('modalCloseButton').addEventListener('click', hideModal);
  document.getElementById('modalCloseFooterButton').addEventListener('click', hideModal);
  
  function fetchWeather(city) {
      const apiKey = 'f9806558f939df933af650d90d674b86';
      $.ajax({
          url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=30&appid=${apiKey}`,
          method: 'GET',
          success: function (data) {
              console.log(data);
              displayWeather(data);
          },
          error: function (error) {
              console.error('Error fetching weather data', error);
              showModal('Unable to fetch weather data. Please try again later.');
          }
      });
  }

  function displayWeather(data) {
      const weatherContainer = document.getElementById('weather-info');
      weatherContainer.innerHTML = '';

      const forecast = data.list[0];
      const date = new Date(forecast.dt_txt);
      const weatherCard = `
          <div class="column is-one-quarter">
              <div class="weather-card">
                  <p class="title">${date.toDateString()}</p>
                  <p class="subtitle">Temp: ${forecast.main.temp}°C</p>
                  <p>${forecast.weather[0].description}</p>
              </div>
          </div>
      `;
      weatherContainer.innerHTML += weatherCard;
  }

  function showModal(message) {
      document.getElementById('modalMessage').innerText = message;
      document.getElementById('alertModal').classList.add('is-active');
  }

  function hideModal() {
      document.getElementById('alertModal').classList.remove('is-active');
  }
});
