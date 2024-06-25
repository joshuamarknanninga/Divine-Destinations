// document.addEventListener('DOMContentLoaded', function () {
    const bookingForm = document.getElementById('bookingForm');

    bookingForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const location = document.getElementById('cityInput').value;
        const checkInDate = document.getElementById('checkIn').value;
        const checkOutDate = document.getElementById('checkOut').value;
        const guests = document.getElementById('guests').value;

        fetchHotels(location, checkInDate, checkOutDate, guests);
    });

    async function fetchHotels(location, checkInDate, checkOutDate, guests) {
        try {
            const response = await fetch(`https://corsproxy.io/?https://serpapi.com/search.json?engine=google_hotels&q=${location}&check_in_date=${checkInDate}&check_out_date=${checkOutDate}&adults=${guests}&currency=USD&gl=us&hl=en&api_key=a84483dbbd6649e736e9ee99bd6b49a698985bf06677556beefc4d13da0272ad`);
            const data = await response.json();
            console.log(data.hotels_results);
            displayHotels(data.hotels_results);
        } catch (error) {
            displayError('Failed to fetch hotel data. Please try again later.');
        }
    }

    function displayHotels(hotels) {
        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.innerHTML = '';

        if (!hotels || hotels.length === 0) {
            displayError('No hotels found for the given criteria.');
            return;
        }

        hotels.forEach(hotel => {
            const hotelCard = document.createElement('div');
            hotelCard.classList.add('hotel-card');

            hotelCard.innerHTML = `
                <img src="${hotel.thumbnail}" alt="${hotel.title}" />
                <div class="hotel-details">
                    <h4>${hotel.title}</h4>
                    <p>${hotel.address}</p>
                    <p>Rating: ${hotel.rating}</p>
                    <p>Price: ${hotel.price}</p>
                </div>
            `;

            resultsContainer.appendChild(hotelCard);
        });
    }

    function displayError(message) {
        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.innerHTML = `<p class="error-message">${message}</p>`;
    }
// });
