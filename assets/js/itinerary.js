// Targest html elements
const searchBar = $("#search-bar")
const itineraryName = $('#itinerary-name')
const searchResults = $('#search-results')
const savedPlaces = $('#saved-places')
const chooseItinerary =$('#choose-itinerary')
const searchError = $('#search-error')

// Arrays for local storage, places on the itinerary, and the search results
const itineraries = JSON.parse(localStorage.getItem('itineraries')) || []
let placesArray = []
let searchResultsArray = []

// Retrieves information from the search bar and retrives API results
function getSearchResults()
{
    // Get the latitude and longitude
    const lat = destinationArray[1]
    const lon = destinationArray[2]
    const rawSearch = searchBar.val().trim()
    const search = rawSearch.replace(" ", "%20")
    
    // Uses Corsproxy to access the Google Maps API
    fetch(`https://corsproxy.io/?https://maps.googleapis.com/maps/api/place/textsearch/json?location=${lat}%2C${lon}&query=${search}&radius=10000&formatted_phone_number&current_opening_hours&rating&website&key=AIzaSyDLZ7B8ucBo6rIiPh3d7FLGnvwF1vdwj_A`).then(function(response)
    {
        if (response.status === 404){}
        else
        {
            response.json().then(function(data)
        {
            // Add results to the search results array and desplay
            searchResultsArray = data.results
            displaySearchResults()
        })

        }
    })
}

// Displays the search results
function displaySearchResults()
{
    // Empty the search results on the page
    searchResults.empty()

    searchResults.attr('style', 'overflow-y: scroll;')

    for (let result of searchResultsArray)
    {
        
        let saved = false;
        let openNow = 'Closed';
        let saveIconAttr = 'bookmark-outline'

        //If the result is the same as the name of a place in place array saved = true
        for(let place of placesArray)
        {
            if (result.name === place.name)
            {
                saved = true
                saveIconAttr = 'bookmark'
            }
        }   
        
        // Determine whether the place is open or closed
        try
        {
            if (result.opening_hours.open_now === true)
            {
                openNow = 'Open';
            } 
        }
        catch
        {
            openNow = 'Please research opening hours'
        }
       
        //Create the place card
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

        // Event handeler for the bookmark/save button
        saveButton.on('click', function () {
            if (saved === false) {
                saveIconAttr = 'bookmark'
                saved = true
                placesArray.push(result)
                displayItinerary()
                

            }
            else {
                saveIconAttr = 'bookmark-outline'
                saved = false
                placesArray.splice(findinPlaceArray(result.name),1)
                displayItinerary() 
                
            }
            saveIcon.attr('name', saveIconAttr)
        })
    }
}

// Finds the searched place in the array of places on the itinerary
function findinPlaceArray(find)
{
    for (let i = 0; i<placesArray.length;i++)
    {
        if(placesArray[i].name === find)
        {
            // Returns the index of the matched place
            return placesArray.indexOf(placesArray[i])
        }
    }
    
}

// Saves the itinerary to local storage
function saveItinerary(event)
{
    event.preventDefault()
    
    // Checks if the name of the itinerary is empty or taken
    if(itineraryName.val().trim() === '')
    {
        itineraryName.attr('class', 'input control is-expanded is-small is-danger is-focused')
        itineraryName.attr('placeholder', 'Please enter an itinerary name.')
    }
    else if (takenName() === true)
    {
        // If you are on an itinerary that already exists save over it
        if(itineraryName.attr('disabled'))
        {
            const currentItinerary = itineraryName.val()
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
        }
        else
        {
            itineraryName.attr('class', 'input control is-expanded is-small is-danger is-focused')
            itineraryName.val('')
            itineraryName.attr('placeholder', 'Itinerary name has been taken')
        }
        
    }
    // Add itinerary to local storage
    else
    {
        const itinerary =
        {
            name: itineraryName.val().trim(),
            places: placesArray,
        }

        itineraries.push(itinerary)
        localStorage.setItem('itineraries', JSON.stringify(itineraries))

        const newOption = $('<option>')
        newOption.text(itinerary.name)
        newOption.attr('value', itinerary.name)
        chooseItinerary.append(newOption)
        itineraryName.attr('disabled', true)
        chooseItinerary.val('Create OR Choose an Itinerary')
    }
    
}

// Checks if the itinerary name has already been used
function takenName()
{
    let nameTaken = false;
    for(let itinerary of itineraries)
    {
        if (itinerary.name === itineraryName.val().trim()) {
            nameTaken = true
        }
    }
    return nameTaken
}

// Displays the itinerary on the page
function displayItinerary()
{
    savedPlaces.attr('style', 'overflow-y: scroll;')
    // Empty the itinerary on the page
    savedPlaces.empty()
    let openNow = 'Closed';

    // Create place cards
    for (let place of placesArray)
    {
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

        // Determine whether the place is open or closed
        try
        {
            if (result.opening_hours.open_now === true)
            {
                openNow = 'Open';
            } 
        }
        catch
        {
            openNow = 'Please research opening hours'
        }
    
        cardDiv.attr('class', 'card')
        cardHeader.attr('class', 'card-header')
        cardHeadertext.attr('class', 'card-header-title')
        deleteButton.attr('class', 'card-header-icon')
        deleteIconSpan.attr('class', 'icon')
        deleteIcon.attr('name', 'trash-outline')
        cardContentDiv.attr('name', 'card-content')
        contentDiv.attr('class', 'content')

        // Event handeler for the delete button for the individual places
        deleteButton.on('click', function(){

            placesArray.splice(placesArray.indexOf(place),1)
            displayItinerary()
            displaySearchResults()
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

// Change the itinerary being worked on
function changeItinerary()
{
    
    itineraryName.attr('class', 'input control is-expanded is-small')
    itineraryName.attr('placeholder', 'Name your Itinerary')

    const selectedItinerary = chooseItinerary.val()

    //Empty the places array
    const emptyArray = [];
    placesArray = emptyArray

   // Make it so the name cannot be edited
   if(selectedItinerary === 'New Itinerary' || selectedItinerary === 'Create OR Choose an Itinerary')
    {
        itineraryName.val('')
        itineraryName.attr('disabled', false)
    }
   else
    {
        itineraryName.val(selectedItinerary)
        itineraryName.attr('disabled', true)
    }
    
    // Add places from the selected itinerary to the places array
    for(let itinerary of itineraries)
    {
        if (itineraryName.val().match(itinerary.name))
        {
           placesArray = itinerary.places
        }
    }

    displayItinerary()
    displaySearchResults()
   
}

// Updates the itineray dropdown when one is deleted
function reloadItineraryList()
{
    // clear all options that are not to choose or create a new intinerary

    const options = chooseItinerary[0]
    const clearedOptions = []
    
    //Clear the named arrays form the dropdown
    for (let option of options)
    {    
        
        if (option.label != 'Create OR Choose an Itinerary' && option.label != 'New Itinerary') {
            
            clearedOptions.push(option.index)
        }
  
    }
    for(let i = 0; i < clearedOptions.length;i++)
    {
        options.remove(clearedOptions[0])
    }
    
    // Re-populate the dropdown
    for(let itinerary of itineraries)
    {
        const newOption = $('<option>')
        newOption.text(itinerary.name)
        newOption.attr('value', itinerary.name)
        chooseItinerary.append(newOption)
    } 
   
}

// Deletes itinerary form local storage
function deleteItinerary(event)
{
    event.preventDefault()

    let currentItinerary = itineraryName.val()
    let itineraryIndex;
   
    for (let itinerary of itineraries)
    {
        
        if (itinerary.name === currentItinerary)
        {
            itineraryIndex = itineraries.indexOf(itinerary)
        }
    }
   
    itineraries.splice(itineraryIndex,1)

    localStorage.setItem('itineraries', JSON.stringify(itineraries))

    currentItinerary = chooseItinerary.val('New Itinerary')
    reloadItineraryList()
    changeItinerary()

}


// Click event for the search button
$('#search-button').on('click',search)
// Click event for the delete button
$('#delete-button').on ('click',deleteItinerary)
// Click event for the save button
$('#save-button').on('click', saveItinerary)
// Click event for changing itinerary
chooseItinerary.on('change', changeItinerary)

// Displays the most recent destination searched in the destination search bar and adds the itinerary names into the dropdown, 
$(document).ready(function()
{
    const destName = destinationArray[0]
    $('#destination').val(destName)
    
    for(let itinerary of itineraries)
    {
        const newOption = $('<option>')
        newOption.text(itinerary.name)
        newOption.attr('value', itinerary.name)
        chooseItinerary.append(newOption)
    }
}   
)