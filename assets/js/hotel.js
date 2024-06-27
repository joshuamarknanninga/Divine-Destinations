document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchButton').addEventListener('click', () => {
      const location = document.getElementById('cityInput').value;
      const checkin = document.getElementById('checkIn').value;
      const checkout = document.getElementById('checkOut').value;
      const guests = document.getElementById('guests').value;
  
      if (location && checkin && checkout && guests) {
        const apiKey = 'a84483dbbd6649e736e9ee99bd6b49a698985bf06677556beefc4d13da0272ad';
        const apiUrl = `https://corsproxy.io/?https://serpapi.com/search.json?engine=google_hotels&q=${location}&check_in_date=${checkin}&check_out_date=${checkout}&adults=${guests}&currency=USD&gl=us&hl=en&api_key=${apiKey}`;
        console.log(json);

        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            displayResults(data.hotels_results);
          })
          .catch(error => console.error('Error fetching data:', error));
      } else {
        alert('Please fill in all fields.');
      }
    });
  
    function displayResults(hotels) {
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = ''; // Clear previous results
  
      if (hotels && hotels.length > 0) {
        hotels.forEach(hotel => {
          const hotelCard = document.createElement('div');
          hotelCard.className = 'hotel-card';
  
          const hotelImg = document.createElement('img');
          hotelImg.src = hotel.thumbnail;
  
          const hotelDetails = document.createElement('div');
          hotelDetails.className = 'hotel-details';
  
          const hotelName = document.createElement('h4');
          hotelName.textContent = hotel.name;
  
          const hotelRating = document.createElement('p');
          hotelRating.textContent = `Rating: ${hotel.rating}`;
  
          const hotelPrice = document.createElement('p');
          hotelPrice.textContent = `Price: ${hotel.price}`;
  
          hotelDetails.appendChild(hotelName);
          hotelDetails.appendChild(hotelRating);
          hotelDetails.appendChild(hotelPrice);
          hotelCard.appendChild(hotelImg);
          hotelCard.appendChild(hotelDetails);
  
          resultsDiv.appendChild(hotelCard);
        });
      } else {
        resultsDiv.innerHTML = '<p>No hotels found for the specified criteria.</p>';
      }
    }
  });
  