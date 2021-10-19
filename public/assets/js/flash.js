const closeButton = document.querySelectorAll(".flash-close");

closeButton.forEach((close) => {
  close.addEventListener("click", () => {
    closeFlash(close.parentElement);
  });
  setTimeout(() => {
    closeFlash(close.parentElement);
  }, 8000);
});

function closeFlash(node) {
  node.classList.add("flash_hide");
  setTimeout(() => {
    node.remove();
  }, 2000);
}
