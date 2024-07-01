// Selects elements
const searchBar = $('#destination')
const modal_container = document.getElementById("modal_container");
const close = document.getElementById("close");

searchBar.attr('style', 'color: #000000')

//Display modal
window.addEventListener("load", () => {
  modal_container.classList.add("show");
  searchBar.val(destinationArray[0])
});

//Remove modal
close.addEventListener("click", () => {
  modal_container.classList.remove("show");
  searchBar.val(destinationArray[0])
  //Sends destination information to the weather API
  cityInfo()
});