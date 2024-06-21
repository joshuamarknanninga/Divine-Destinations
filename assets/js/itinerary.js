const selectCategory = $("#place-categories");
const searchBar = $("#search-bar")
const itineraryName = $('#itinerary-name')
const searchResults = $('#search-results')

const itineraryies = JSON.parse(localStorage.getItem('itineraries')) || []
function getSearch()
{
    console.log(selectCategory.val())
}

function saveItinerary(placesArray)
{
    addPlaces()
    const itinerary = 
    {
        name:itineraryName,
        places: placesArray
    }

    itineraryies.push(itinerary)
    localStorage.setItem('itineraryies', JSON.stringify(itineraryies))
}

function addPlaces()
{
    const placesArray = []

    return placesArray
}
function displaySearchResults(searchResults)
{
    searchResults.attr('style', 'overflow-y: scroll;')

    for (let search of searchResults)
    {
        const cardDIv = $('<div>')
        const cardHeader = $('<header>')
        const cardHeadertext = $('<p>')
        
    }
}

function getSearchResults()
{
    fetch().then(function(response)
    {
        if (response.status === 404)
        {

        }
        else
        {
            response.json().then(function(data)
        {
            displaySearchResults (data)
        })

        }
    })
}













$('#save-button').on('click', saveItinerary)
$("search-button").on('click', getSearch)