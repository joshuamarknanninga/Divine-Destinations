const searchBar = $('#destination')
searchBar.attr('style', 'color: #000000')
const modal_container = document.getElementById("modal_container");
const close = document.getElementById("close");


window.addEventListener("load", () => {
  modal_container.classList.add("show");
  searchBar.val(destinationArray[0])
});

close.addEventListener("click", () => {
  modal_container.classList.remove("show");
  searchBar.val(destinationArray[0])
  cityInfo()
});