/* document.addEventListener('DOMContentLoaded', () => {
    // Show the modal on page load
    document.querySelector('#destinationModal').classList.add('is-active');

    // Handle form submission
    document.querySelector('#destination-form').addEventListener('submit', function (event) {
        event.preventDefault();
        let destination = document.querySelector('#destination').value;
        if (destination) {
            document.querySelector('#destinationModal').classList.remove('is-active');
            fetchWeather(destination);
            fetchHotels(destination);
            // Add more fetch functions for tourist spots, concert venues, etc.
        }
    });

    // Function to fetch weather data
    function fetchWeather(destination) {
        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=YourAPIKey`,
            method: 'GET',
            success: function (data) {
                document.querySelector('#weather-info').innerHTML = `
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Weather: ${data.weather[0].description}</p>
                `;
            },
            error: function (error) {
                console.error('Error fetching weather data', error);
            }
        });
    }

    // Function to fetch hotel data
    function fetchHotels(destination) {
        // Example API call for hotels (replace with actual API)
        $.ajax({
            url: `https://api.example.com/hotels?location=${destination}`,
            method: 'GET',
            success: function (data) {
                let hotelsHtml = '';
                data.hotels.forEach(hotel => {
                    hotelsHtml += `
                        <div>
                            <h3>${hote} */


$('#searchButton').on('click',search)
