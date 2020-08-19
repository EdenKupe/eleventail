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
  if (event.target.classList.contains('entryContainer')) {
    var content = event.target;
    var contentChild = content.querySelector('.contentContainer');
    contentChild.classList.toggle('shortText');
    contentChild.classList.toggle('invisible');
    contentChild.classList.toggle('opacity-0');
    contentChild.classList.toggle('opacity-100');
    var contentCaret = content.querySelector('.fa-caret-down');
    contentCaret.classList.toggle('rotate');
  } else if (event.target.classList.contains('authorContainer')) {
    var content = event.target.nextElementSibling;
    content.classList.toggle('shortText');
    content.classList.toggle('invisible');
    content.classList.toggle('opacity-0');
    content.classList.toggle('opacity-100');
    console.log(event.target);
    var contentCaret = event.target.closest('.entryContainer').querySelector('.fa-caret-down');
    contentCaret.classList.toggle('rotate');
  } else if (event.target.classList == '') {
    var content = event.target.parentNode;
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


// In-view function
const handleView = item => {
  console.log('hello');
  console.log(item);
  const linkEl = document.querySelector(`#link-${item}`);

  let offsetHeight = window.innerHeight
  inView.offset({
    bottom:offsetHeight
  });

  inView(`#letter-${item}`)
    .on("enter", () => linkEl.classList.add('is-active'))
    .on("exit", el  => linkEl.classList.remove('is-active'))
};

// Apply method on each DOM element 
["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l","m", "n", "o", "p", "q", "r","s", "t", "u", "v", "w", "x", "y", "z" ].forEach(handleView);