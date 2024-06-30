const searchBar = $("#search-bar")
const itineraryName = $('#itinerary-name')
const searchResults = $('#search-results')
const savedPlaces = $('#saved-places')
const chooseItinerary =$('#choose-itinerary')

const itineraries = JSON.parse(localStorage.getItem('itineraries')) || []
let placesArray = []
let searchResultsArray = []

function getSearchResults(event)
{
    // event.preventDefault()

    /* const lat = 27.9736
    const lon = -82.7643 */
    const lat = destinationArray[1]
    const lon = destinationArray[2]
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
            searchResultsArray = data.results
            displaySearchResults()
        })

        }
    })
}

function displaySearchResults()
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
            console.log(result)
            console.log(place)
            if (result.name === place.name)
            {
                saved = true
                saveIconAttr = 'bookmark'
            }
            /* else
            {
                console.log(result)
                console.log(place)
                saveIconAttr = 'bookmark-outline'
            } */
        }    
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
            console.log('click')
            if (saved === false) {
                saveIconAttr = 'bookmark'
                saved = true
                // savedPlaces.append(cardDiv)
                placesArray.push(result)
                console.log(placesArray.indexOf(result))
                displayItinerary()
                

            }
            else {
                saveIconAttr = 'bookmark-outline'
                saved = false
                // const currentItinerary = chooseItinerary.val()
                placesArray.splice(findinPlaceArray(result.name),1)
                    
               /*      let itineraryIndex;
                   
                    for (let itinerary of itineraries)
                    {
                        
                        if (itinerary.name === currentItinerary)
                        {
                            itineraryIndex = itineraries.indexOf(itinerary)
                        }
                    }
                   
                    itineraries[itineraryIndex].places = placesArray
        
                    localStorage.setItem('itineraries', JSON.stringify(itineraries))*/
                    displayItinerary() 
                
            }
            saveIcon.attr('name', saveIconAttr)
        })
    }
}

function findinPlaceArray(find)
{
    for (let i = 0; i<placesArray.length;i++)
    {
        console.log(placesArray[i])
        if(placesArray[i].name === find)
        {
            console.log(placesArray.indexOf(placesArray[i]))
            return placesArray.indexOf(placesArray[i])
        }
    }
    
}

function displayItinerary()
{
    // savedPlaces.attr('style', 'overflow-y: scroll;')
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

        deleteButton.on('click', function(){

            // find name of itinerary, delete the place in that itinerary, update local storage, update places array, display
            const currentItinerary = chooseItinerary.val()
            placesArray.splice(placesArray.indexOf(place),1)
            /* let itineraryIndex;
           
            for (let itinerary of itineraries)
            {
                
                if (itinerary.name === currentItinerary)
                {
                    itineraryIndex = itineraries.indexOf(itinerary)
                }
            }
           
            itineraries[itineraryIndex].places = placesArray

            localStorage.setItem('itineraries', JSON.stringify(itineraries)) */
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
function saveItinerary(event)
{
    event.preventDefault()
    

    if(itineraryName.val().trim() === '')
    {
        itineraryName.attr('class', 'input control is-expanded is-small is-danger is-focused')
        itineraryName.attr('placeholder', 'Please enter an itinerary name.')
    }
    else if (takenName() === true)
    {
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

function changeItinerary()
{
    
    itineraryName.attr('class', 'input control is-expanded is-small')
    itineraryName.attr('placeholder', 'Name your Itinerary')

    const selectedItinerary = chooseItinerary.val()
    const emptyArray = [];
    placesArray = emptyArray
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

/* function changeBookmark(result)
{
    let saveIconAttr = 'bookmark-outline'  
    for (let place of placesArray) {
        if ( result === place.name) {
            console.log(result)
            console.log(place.name)
            saveIconAttr = 'bookmark'
        }
    }
    return saveIconAttr
} */

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
    console.log(itineraries)

    localStorage.setItem('itineraries', JSON.stringify(itineraries))

    currentItinerary = chooseItinerary.val('New Itinerary')
    reloadItineraryList()
    changeItinerary()

}

function reloadItineraryList()
{
    // clear all options that are not choose or new

    const options = chooseItinerary[0]
    const clearedOptions = []
    
   /*  const deleteIndex = options.find(removalIndex)

    while(options.length > 2)
    {
        options.remove(deleteIndex)
    } */
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
    
    for(let itinerary of itineraries)
    {
        const newOption = $('<option>')
        newOption.text(itinerary.name)
        newOption.attr('value', itinerary.name)
        chooseItinerary.append(newOption)
    } 
   
}

/* function removalIndex(option)
{
    if (option.label != 'Create OR Choose an Itinerary' && option.label != 'New Itinerary') {
            
        return option.index
    }
    
} */

//displaySearchResults(searchResultsList)
$('#search-button').on('click',search)
// $('#search-button').on('click',getSearchResults)

$('#delete-button').on ('click',deleteItinerary)

$('#save-button').on('click', saveItinerary)
chooseItinerary.on('change', changeItinerary)

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
    console.log(chooseItinerary[0][0].label)
    console.log(chooseItinerary[0])
    for (let choice of chooseItinerary[0]) {
        console.log(choice.label)
    }
}   
)