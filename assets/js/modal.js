
const modal_container = document.getElementById("modal_container");
const close = document.getElementById("close");

window.addEventListener("load", () => {
  modal_container.classList.add("show");
});

close.addEventListener("click", () => {
  modal_container.classList.remove("show");
});
/* $(document).ready(function()
{
 

  const modal = $('<div>')
  const modalBackground = $('<div>')
  const modalCard = $('<div>')
  const modalHead = $('<header>')
  const modalTitle = $('<p>')
  const closeButton = $('<button>')
  const modalCardBody = $('<section>')

  modal.attr('class', "modal")
  modalBackground.attr('class',"modal-background")
  modalCard.attr('class', "modal-card")
  modalHead.attr('class',"modal-card-head")
  modalTitle.attr('class',"modal-card-title")
  closeButton.attr('class',"delete")
  closeButton.attr('aria-label',"close")
  modalCardBody.attr('class',"modal-card-body")

  modalTitle.text('testing')
  modalCardBody.text('testing')

  modalHead.append(modalTitle)
  modalHead.append(closeButton)

  modalCard.append(modalHead)
  modalCard.append(modalCardBody)

  modalBackground.append(modalCard)
  modal.append(modalBackground)
  $('body').append(modal)
  
}) */

/* <div class="modal">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Modal title</p>
      <button class="delete" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      <!-- Content ... -->
    </section>
  </div>
</div> */