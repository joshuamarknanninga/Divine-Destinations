// Destination array from local storage
let destinationArray = JSON.parse(localStorage.getItem('destination')) || []

function search(event)
{
    try{
        event.preventDefault()
    
        fetchFunction()
    }
    catch{
        fetchFunction()
    }
}

// Get information from the API, and store the destination, latitude and longitude in local storage
function fetchFunction()
{
    const rawSearch = $('#destination').val().trim()
    const search = rawSearch.replace(" ", "%20")
    fetch(`https://corsproxy.io/?https://maps.googleapis.com/maps/api/place/textsearch/json?&query=${search}&radius=10000&formatted_phone_number&current_opening_hours&rating&website&key=AIzaSyDLZ7B8ucBo6rIiPh3d7FLGnvwF1vdwj_A`).then(function (response) {
        if (response.status === 404) {
            console.log('error')
        }
        else {
            response.json().then(function (data) {
                
                console.log(data)
                const lat = data.results[0].geometry.location.lat
                const long = data.results[0].geometry.location.lng
                const tempArray = []
                tempArray.push(data.results[0].formatted_address)
                tempArray.push(lat)
                tempArray.push(long)
                destinationArray = tempArray
                localStorage.setItem('destination', JSON.stringify(destinationArray))

                // Search for places for the itinerary
                try
                {
                    getSearchResults()
                }
                catch
                {}
            })

        }
    })  
}