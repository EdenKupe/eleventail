anchors.options = {
  placement: 'left',
};
anchors.add('.authorName');

// slugify strings util function
function string_to_slug (str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

  return str;
}

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
  const linkEl = document.querySelector(`#link-${item}`);

  let offsetHeight = window.innerHeight
  inView.offset({
    bottom:offsetHeight
  });

  inView(`#letter-${item}`)
    .on("enter", () => {
      if (linkEl.classList.contains('is-active')) {
        return false;
      } else {
        const prevEl = document.querySelector(`.is-active`);
        if (prevEl) {
          prevEl.classList.remove('is-active');
        }
        linkEl.classList.add('is-active');
      }
      
  });
};

// Apply method on each DOM element 
["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l","m", "n", "o", "p", "q", "r","s", "t", "u", "v", "w", "x", "y", "z"].forEach(handleView);

function activateLink (event) {
  console.log('active');
  const prevEl = document.querySelector(`.is-active`);
  if (prevEl) {
    prevEl.classList.remove('is-active');
  }
  event.target.parentNode.classList.add('is-active');
}

// search stuff
var client = algoliasearch("3A13LF0NQN", "2066d124b58e7b6d9aabc19d2a38fc40");
var anarchyIndex = client.initIndex("anarchy");
var search = document.getElementById("aa-search-input");

const searchInstance = autocomplete(
  "#aa-search-input",
  {
    debug: false
  },
  [
    {
      source: autocomplete.sources.hits(anarchyIndex, { hitsPerPage: 7 }),
      displayKey: "",
      name: "anarchy" /* class aa-dataset-anarchy */,
      templates: {
        suggestion: function(suggestion) {
          console.log(suggestion);
          let value = suggestion.pagename;
          let content = suggestion.content;
          let link = suggestion.permalink;
          let title = $("title");
          let titletext = title.text();
          if (suggestion._highlightResult.author) {
            value = suggestion._highlightResult.author.value;
          }
          if (suggestion._snippetResult.content) {
            content = suggestion._snippetResult.content.value;
          }
          let initialText = suggestion.author;
          let linkText = string_to_slug(initialText);
          suggestion.permalink = linkText;
          return (
            '<span class="searchtitlecontainer">' +
            '<a href="#' + linkText + '" + class="searchtitle" href="' +
            link +
            '">' +
            value +
            "</a> </span>" +
            "<br />" +
            '<a class="searchlinktext" href="#' +
            linkText +
            '">' +
            '<span class="searchcontentcontainer">' +
            content +
            "</span> </a> "
          );
        }
      },
      empty: '<div class="aa-empty">No results found!</div>'
    }
  ]
);

//loading fonts

(function() {

  // Optimization for Repeat Views
  if( sessionStorage.fontsLoadedFoutWithClass ) {
    document.documentElement.className += "fonts-loaded";
    return;
  }

  if( "fonts" in document ) {
    Promise.all([
      document.fonts.load("1em Wotfard"),
      document.fonts.load("500 1em Wotfard"),
    ]).then(function () {
      document.documentElement.className += "fonts-loaded";

      // Optimization for Repeat Views
      sessionStorage.fontsLoadedFoutWithClass = true;
    });
  }
})();