document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchButton').addEventListener('click', (event) => {
        event.preventDefault();
      const location = document.getElementById('destination').value;
      fetchFunction()
      const checkin = document.getElementById('checkIn').value;
      const checkout = document.getElementById('checkOut').value;
      const guests = document.getElementById('guests').value;
  console.log("insideEventlistener");

      if (location && checkin && checkout && guests) {
        const apiKey = '86ff513e1977efc13c7d8bf3df1893184756138b5d4c7c7004e96f37a1339138';
        // Uses CorsProxy
        const apiUrl = `https://corsproxy.io/?https://serpapi.com/search.json?engine=google_hotels&q=${location}&check_in_date=${checkin}&check_out_date=${checkout}&adults=${guests}&currency=USD&gl=us&hl=en&api_key=${apiKey}`;
        console.log("insideIflistener");

        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
        console.log(data);
            displayResults(data.properties);
          })
          .catch(error => console.error('Error fetching data:', error));
      } else {
        
      }
    });
  
    function displayResults(hotels = [{}]) {
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = ''; // Clear previous results
  console.log("hotel", hotels);

      if (hotels && hotels.length > 0) {
        hotels.forEach((hotel, index) => {
          console.log(hotel, "current hotel");
          const hotelCard = document.createElement('div');
          hotelCard.className = 'hotel-card';
          hotelCard.id = 'hotel-id_' + index;
  
          const hotelImg = document.createElement('img');
          console.log(hotel.images);
          hotelImg.src = hotel.images[0].thumbnail;
  
          const hotelDetails = document.createElement('div');
          hotelDetails.className = 'hotel-details';
  
          const hotelName = document.createElement('h4');
          hotelName.textContent = hotel.name;
  
          const hotelRating = document.createElement('p');
          hotelRating.textContent = `Rating: ${hotel.overall_rating || "No rating."}`;
  
          const hotelPrice = document.createElement('p');
          hotelPrice.textContent = `Price: ${hotel.rate_per_night.before_taxes_fees || "Call for rates."}`;
  
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

  $(document).ready(function()
  {
    const destName = destinationArray[0]
    $('#destination').val(destName)
  })