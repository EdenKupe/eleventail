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
 let content;
  if (event.target.classList.contains('entryContainer')) {
    content = event.target;
    var contentChild = content.querySelector('.contentContainer');
    contentChild.classList.toggle('shortText');
    contentChild.classList.toggle('invisible');
    contentChild.classList.toggle('opacity-0');
    contentChild.classList.toggle('opacity-100');
    var contentCaret = content.querySelector('.fa-caret-down');
    contentCaret.classList.toggle('rotate');
  } else if (event.target.classList.contains('authorContainer')) {
    content = event.target.nextElementSibling;
    content.classList.toggle('shortText');
    content.classList.toggle('invisible');
    content.classList.toggle('opacity-0');
    content.classList.toggle('opacity-100');
    console.log(event.target);
    var contentCaret = event.target.closest('.entryContainer').querySelector('.fa-caret-down');
    contentCaret.classList.toggle('rotate');
  } else if (event.target.classList == '') {
    content = event.target.parentNode;
    content.classList.toggle('shortText');
    content.classList.toggle('invisible');
    content.classList.toggle('opacity-0');
    content.classList.toggle('opacity-100');
    var contentCaret = event.target.closest('.entryContainer').querySelector('.fa-caret-down');
    contentCaret.classList.toggle('rotate');
  } 
}

function contentRotate(event) {
  var content = event.target;
  content.classList.toggle('rotate');
}