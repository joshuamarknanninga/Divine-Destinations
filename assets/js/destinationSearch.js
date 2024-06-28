const destinationArray = JSON.parse(localStorage.getItem('destination')) || []
function search(event)
{
  event.preventDefault()

    const rawSearch = $('#searchBar').val().trim()
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
                destinationArray.push(data.results[0].formatted_address)
                destinationArray.push(lat)
                destinationArray.push(long)
                localStorage.setItem('destination', JSON.stringify(destinationArray))
            })

        }
    })  
}