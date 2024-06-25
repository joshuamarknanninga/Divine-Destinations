
// let searchResultsList = ['test','test1','test2','test3','test4','test5','test6','test7']

// const selectCategory = $("#place-categories");
const searchBar = $("#search-bar")
const itineraryName = $('#itinerary-name')
const searchResults = $('#search-results')
const savedPlaces = $('#saved-places')
const chooseItinerary =$('#choose-itinerary')

const itineraries = JSON.parse(localStorage.getItem('itineraries')) || []
let placesArray = []


function getSearchResults(event)
{
    event.preventDefault()
    const lat = 27.9736
    const lon = -82.7643
    const rawSearch = searchBar.val().trim()
    const search = rawSearch.replace(" ", "%20")
    
    fetch(`https://corsproxy.io/?https://maps.googleapis.com/maps/api/place/textsearch/json?location=${lat}%2C${lon}&query=${search}&radius=10000&formatted_phone_number&current_opening_hours&rating&website&key=AIzaSyDLZ7B8ucBo6rIiPh3d7FLGnvwF1vdwj_A`).then(function(response)
    {
        if (response.status === 404)
        {
            console.log('error')
        }
        else
        {
            response.json().then(function(data)
        {
            displaySearchResults(data.results)
        })

        }
    })
}

function displaySearchResults(searchResultsArray)
{
    
    searchResults.empty()
    searchResults.attr('style', 'overflow-y: scroll;')
    console.log(searchResultsArray)
    for (let result of searchResultsArray)
    {
        //if the name is the same as the name of a place in place array saved = true
        let saved = false;
        let openNow = 'Closed';
        let saveIconAttr = 'bookmark-outline'
        

        for(let place of placesArray)
        {
            if (result.name === place)
            {
                console.log(result)
                console.log(place)
                saveIconAttr = 'bookmark'
            }
            else
            {
                console.log(result)
                console.log(place)
                saveIconAttr = 'bookmark-outline'
            }
        }    
        
        if (result.opening_hours.open_now === true)
        {
            openNow = 'Open';
        }
        const cardDiv = $('<div>')
        const cardHeader = $('<header>')
        const cardHeadertext = $('<p>')
        const saveButton = $('<button>')
        const saveIconSpan = $('<span>')
        const saveIcon = $('<ion-icon>')
        const cardContentDiv = $('<div>')
        const contentDiv = $('<div>')
        const rating = $('<p>')
        const address = $('<p>')
        const openNowText = $('<p>')

        cardDiv.attr('class', 'card')
        cardHeader.attr('class', 'card-header')
        cardHeadertext.attr('class', 'card-header-title')
        saveButton.attr('class', 'card-header-icon')
        saveIconSpan.attr('class', 'icon')
        saveIcon.attr('name', saveIconAttr)
        

        cardContentDiv.attr('name', 'card-content')
        contentDiv.attr('class', 'content')

        cardHeadertext.text(result.name)
        rating.text(`Rating: ${result.rating}/5`)
        address.text(`Address: ${result.formatted_address}`)
        openNowText.text(`${openNow}`)

        contentDiv.append(rating)
        contentDiv.append(address)
        contentDiv.append(openNowText)

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
                placesArray.push(result)
                displayItinerary()

            }
            else {
                saveIcon.attr('name', 'bookmark-outline')
                saved = false
                // savedPlaces.remove(cardDiv)
            }
        })
    }
}

function displayItinerary()
{
    savedPlaces.empty()
    let openNow = 'Closed';
    for (let place of placesArray)
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
        const rating = $('<p>')
        const address = $('<p>')
        const openNowText = $('<p>')

        if (place.opening_hours.open_now === true)
            {
                openNow = 'Open';
            }
    
        cardDiv.attr('class', 'card')
        cardHeader.attr('class', 'card-header')
        cardHeadertext.attr('class', 'card-header-title')
        deleteButton.attr('class', 'card-header-icon')
        deleteIconSpan.attr('class', 'icon')
        deleteIcon.attr('name', 'trash-outline')
        cardContentDiv.attr('name', 'card-content')
        contentDiv.attr('class', 'content')

        deleteButton.on('click', function(){

            // find name of itinerary, delete the place in that itinerary, update local storage, update places array, display
            const currentItinerary = chooseItinerary.val()
            placesArray.splice(placesArray.indexOf(place),1)
            let itineraryIndex;
           
            for (let itinerary of itineraries)
            {
                
                if (itinerary.name === currentItinerary)
                {
                    itineraryIndex = itineraries.indexOf(itinerary)
                }
            }
           
            itineraries[itineraryIndex].places = placesArray

            localStorage.setItem('itineraries', JSON.stringify(itineraries))
            displayItinerary()
        })
    
        cardHeadertext.text(place.name)
        rating.text(`Rating: ${place.rating}/5`)
        address.text(`Address: ${place.formatted_address}`)
        openNowText.text(`${openNow}`)

        contentDiv.append(rating)
        contentDiv.append(address)
        contentDiv.append(openNowText)
    
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

function saveItinerary(event)
{
    event.preventDefault()
    const itinerary = 
    {
        name:itineraryName.val().trim(),
        places: placesArray,
    }

    itineraries.push(itinerary)
    localStorage.setItem('itineraries', JSON.stringify(itineraries))

    const newOption = $('<option>')
    newOption.text(itinerary.name)
    newOption.attr('value', itinerary.name)
    chooseItinerary.append(newOption)
    const emptyArray = [];
    placesArray = emptyArray
}

function changeItinerary()
{
   const selectedItinerary = chooseItinerary.val()
    const emptyArray = [];
    placesArray = emptyArray
   if(selectedItinerary === 'New Itinerary')
    {
        itineraryName.val('')
    }
   else
    {
        itineraryName.val(selectedItinerary)
    }
    
    for(let itinerary of itineraries)
    {
        if (itineraryName.val().match(itinerary.name))
        {
           placesArray = itinerary.places
        }
    }
    
    displayItinerary()
    //displaySearchResults(searchResultsList)
   
}

function deleteItinerary(event)
{
    event.preventDefault()

    let currentItinerary = chooseItinerary.val()
    let itineraryIndex;
   
    for (let itinerary of itineraries)
    {
        
        if (itinerary.name === currentItinerary)
        {
            itineraryIndex = itineraries.indexOf(itinerary)
        }
    }
   
    itineraries.splice(itineraryIndex,1)
    console.log(itineraries)

    localStorage.setItem('itineraries', JSON.stringify(itineraries))

    currentItinerary = chooseItinerary.val('New Itinerary')
    changeItinerary()

}
/* function addPlaces(search)
{
    const placesArray = []
    placesArray.push(search)
    return placesArray
} */

//displaySearchResults(searchResultsList)
$('#search-button').on('click',getSearchResults)
$('#delete-button').on ('click',deleteItinerary)

$('#save-button').on('click', saveItinerary)
chooseItinerary.on('change', changeItinerary)

$(document).ready(function()
{
    for(let itinerary of itineraries)
    {
        const newOption = $('<option>')
        newOption.text(itinerary.name)
        newOption.attr('value', itinerary.name)
        chooseItinerary.append(newOption)
    }

})