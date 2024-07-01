const open = document.getElementById("open");
const discount_modal_container = document.getElementById(
  "discount_modal_container"
);
const discount_close = document.getElementById("discount_close");

open.addEventListener("click", () => {
  discount_modal_container.classList.add("show");
});

discount_close.addEventListener("click", () => {
  discount_modal_container.classList.remove("show");
});
