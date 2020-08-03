// simple button click event handler
function btnHandler(selector, callback) {
  var btn = document.querySelector(selector);
  if(!btn) { return; }
  btn.addEventListener('click', function(event) {
    event.preventDefault();
    callback();
  }, false);
}

function contentCollapse (event) {
  var content = event.target.nextElementSibling;
  content.classList.toggle('shortText');
  content.classList.toggle('invisible');
  content.classList.toggle('opacity-0');
  content.classList.toggle('opacity-100');
}