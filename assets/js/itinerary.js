const selectCategory = $("#place-categories");
const searchBar = $("#search-bar")
const itineraryName = $('#itinerary-name')
const searchResults = $('#search-results')
const savedPlaces = $('#saved-places')

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
        places: placesArray,
    }

    itineraryies.push(itinerary)
    localStorage.setItem('itineraryies', JSON.stringify(itineraryies))
}

function addPlaces(search)
{
    const placesArray = []
    placesArray.push(search)
    return placesArray
}
function displaySearchResults(searchResultsArray)
{
    searchResults.empty()
    searchResults.attr('style', 'overflow-y: scroll;')
    
    for (let search of searchResultsArray)
    {
        //if the name is the same as the name of a place in place array saved = true
        let saved = false;
        const cardDiv = $('<div>')
        const cardHeader = $('<header>')
        const cardHeadertext = $('<p>')
        const saveButton = $('<button>')
        const saveIconSpan = $('<span>')
        const saveIcon = $('<ion-icon>')
        const cardContentDiv = $('<div>')
        const contentDiv = $('<div>')

        cardDiv.attr('class', 'card')
        cardHeader.attr('class', 'card-header')
        cardHeadertext.attr('class', 'card-header-title')
        saveButton.attr('class', 'card-header-icon')
        saveIconSpan.attr('class', 'icon')
        saveIcon.attr('name', 'bookmark-outline')
        cardContentDiv.attr('name', 'card-content')
        contentDiv.attr('class', 'content')

        cardHeadertext.text(search)
        contentDiv.text('testing')

        saveIconSpan.append(saveIcon)
        saveButton.append(saveIconSpan)
        cardHeader.append(cardHeadertext)
        cardHeader.append(saveButton)

        cardContentDiv.append(contentDiv)
        cardDiv.append(cardHeader)
        cardDiv.append(cardContentDiv)
        searchResults.append(cardDiv)

        saveButton.on('click', function () {
            if (saved === false) {
                saveIcon.attr('name', 'bookmark')
                saved = true
                // savedPlaces.append(cardDiv)
                placesArray = addPlaces(search)
                displayItinerary(placesArray)

            }
            else {
                saveIcon.attr('name', 'bookmark-outline')
                saved = false
                // savedPlaces.remove(cardDiv)
            }
        })
    }
}

function displayItinerary(placesArray)
{
    for (let search of placesArray)
    {
            // let saved = false;
        const cardDiv = $('<div>')
        const cardHeader = $('<header>')
        const cardHeadertext = $('<p>')
        const deleteButton = $('<button>')
        const deleteIconSpan = $('<span>')
        const deleteIcon = $('<ion-icon>')
        const cardContentDiv = $('<div>')
        const contentDiv = $('<div>')
    
        cardDiv.attr('class', 'card')
        cardHeader.attr('class', 'card-header')
        cardHeadertext.attr('class', 'card-header-title')
        deleteButton.attr('class', 'card-header-icon')
        deleteIconSpan.attr('class', 'icon')
        deleteIcon.attr('name', 'trash-outline')
        cardContentDiv.attr('name', 'card-content')
        contentDiv.attr('class', 'content')
    
        cardHeadertext.text(search)
        contentDiv.text('testing')
    
        deleteIconSpan.append(deleteIcon)
        deleteButton.append(deleteIconSpan)
        cardHeader.append(cardHeadertext)
        cardHeader.append(deleteButton)
    
        cardContentDiv.append(contentDiv)
        cardDiv.append(cardHeader)
        cardDiv.append(cardContentDiv)
        savedPlaces.append(cardDiv)
    }
}



/* function getSearchResults(event)
{
    event.preventDefault()
    const lat = 27.9736
    const lon = -82.7643
    const rawSearch = searchBar.val().trim()
    const search = rawSearch.replace(" ", "%20")
    
    fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?location=${lat}%2C${lon}&query=${search}&radius=10000&formatted_phone_number*&current_opening_hours&rating&website&key=AIzaSyDLZ7B8ucBo6rIiPh3d7FLGnvwF1vdwj_A`).then(function(response)
    {
        if (response.status === 404)
        {
            console.log('error')
        }
        else
        {
            response.json().then(function(data)
        {
            // displaySearchResults(data)
            console.log('ok')
        })

        }
    })
} */












const searchresults = ['test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test',]
displaySearchResults(searchresults)
// $('#search-button').on('click',getSearchResults)
$('#save-button').on('click', saveItinerary)
$("search-button").on('click', getSearch)