// shoutouts to bevacqua, jayrhynas and hustcc for their amazing fuzzysearch.
function fuzzysearch(needle, haystack) {
   var hlen = haystack.length;
   var nlen = needle.length;
   if (nlen > hlen) {
      return false;
   }
   if (nlen === hlen) {
      return needle === haystack;
   }
   outer: for (var i = 0, j = 0; i < nlen; i++) {
      var nch = needle.charCodeAt(i);
      while (j < hlen) {
         if (haystack.charCodeAt(j++) === nch) {
            continue outer;
         }
      }
      return false;
   }
   return true;
}

function c(elementName, options) {
   let element = document.createElement(elementName);
   if (options) {
      if (options.text) {element.innerText = options.text}
      if (options.class) {element.classList.add(options.class)}
      if (options.id) {element.id = options.id}
      if (options.type) {element.type = options.type}
      if (options.placeholder) {element.placeholder = options.placeholder}
      if (options.href) {element.href = options.href}
      if (options.elements) {
         for (let i = 0; i < options.elements.length; i++) {
            element.append(options.elements[i])
         }
      }
   }

   return element
}

let hidden = true;

let displaydata = []
let selected = 0;
let config;

let searchBar;
let cover;

function hideSearch(str) {
   document.getElementById("search").style = "display: none;";
   document.getElementsByClassName("cover")[0].style = "display: none;";
   hidden = true;
}

function showSearch(str) {
   document.getElementById("search").style = "display: block;";
   document.getElementsByClassName("cover")[0].style = "display: block;";
   let sel = document.getElementById("sinput")
   sel.focus()
   if (hidden === true) {
      hidden = false;
      sel.value = ""
      renderResults(displaydata, selected)
   }
}

let keydowneventlist;

let searchbarCallback;

function kill() {
   cover.remove()
   searchBar.remove()
   document.removeEventListener("keydown", keydowneventlist)
}

function initSearchBar(resultArray, configObj, callback) {
   searchbarCallback = callback;
   config = configObj
   searchBar = c("section", {
      text: undefined, class: "searchbar", id: "search", elements: [
         c("div", {
            class: "searchdiv", elements: [
               c("input", {id: "sinput", placeholder: config.name}),
               c("div", {id: "results"})
            ]
         })
      ]
   });

   displaydata = resultArray;

   cover = c("section", {class: "cover"})

   cover.addEventListener("click", () => {
      hideSearch("search")
   })

   document.body.append(searchBar)
   document.body.append(cover)

   let sinput = document.getElementById("sinput")
   sinput.addEventListener("input", () => {
      displaydata = []
      for (let i = 0; i < resultArray.length; i++) {
         if (config.secondSearchKey) {
            if (resultArray[i][config.secondSearchKey]) {
               if (
                  fuzzysearch(sinput.value.toUpperCase(), resultArray[i][config.searchKey].toUpperCase()) ||
                  fuzzysearch(sinput.value.toUpperCase(), resultArray[i][config.secondSearchKey].toUpperCase())
               ) {
                  displaydata.push(resultArray[i])
               }
            }
            else {
               if (fuzzysearch(sinput.value.toUpperCase(), resultArray[i][config.searchKey].toUpperCase())) {
                  displaydata.push(resultArray[i])
               }
            }
         }
         else {
            if (fuzzysearch(sinput.value.toUpperCase(), resultArray[i][config.searchKey].toUpperCase())) {
               displaydata.push(resultArray[i])
            }
         }
      }
      selected = 0;
      renderResults(displaydata, selected)
   })
   hideSearch("search")
   function keydowneventlist(event) {
      if (event.ctrlKey && event.key === 'c') {
         hideSearch("search")
      }
      if (event.ctrlKey && event.key === 'j') {
         selectDown();
         event.preventDefault()
      }
      if (event.ctrlKey && event.key === 'k') {
         selectUp()
         showSearch()
         event.preventDefault()
      }

      if (event.code == "ArrowDown") {
         selectDown();
         event.preventDefault()
      }
      if (event.code == "ArrowUp") {
         selectUp()
         showSearch()
         event.preventDefault()
      }

      if (event.key === 'Escape') {
         hideSearch()
         event.preventDefault()
      }
      if (!hidden) {
         if (event.key === 'Enter') {
            callback(displaydata[selected])
            //searchBar.remove()
            //cover.remove()
            event.preventDefault()
         }
      }
   }


   document.addEventListener("keydown", keydowneventlist)

   hideSearch("search")
   let url = window.location.pathname;
   //let bloatId = setInterval(() => {
   //if (url !== window.location.pathname) {
   //kill()
   //console.log("I AM BLOATWARE (aka killed the searchbar)")
   //clearInterval(bloatId)
   //}
   //}, 2000)
   return {hide: hideSearch, show: showSearch, destroy: kill}
}


function selectDown() {
   if (config.maxResults !== undefined) {
      if (selected < config.maxResults - 1 && selected < displaydata.length - 1) {
         selected++
         renderResults(displaydata, selected)
      }
   }
   else {
      if (selected < displaydata.length - 1) {
         selected++
         renderResults(displaydata, selected)
      }
   }
}
function selectUp() {
   if (selected > 0) {
      selected--
      renderResults(displaydata, selected)
   }
}

function renderResults(data, selection) {
   let els = []
   document.getElementById("results").innerHTML = ""

   let iterations;

   if (config.maxResults !== undefined) {
      if (config.maxResults >= data.length) {
         iterations = data.length;
      }
      else {
         iterations = config.maxResults;
      }
   }
   else {
      iterations = data.length
   }

   for (let i = 0; i < iterations; i++) {

      // USE SHORTHAND INSTEAD BRUH
      if (config.href != undefined) {
         if (selection === i) {
            els.push(c("a", {
               href: data[i][config.href], class: "resultlink", elements: [c("div", {
                  elements: [
                     c("h2", {text: data[i][config.title]}),
                     c("p", {text: data[i][config.description]})
                  ], class: "result", id: "selected"
               })]
            }))
         }
         else {
            els.push(c("a", {
               href: data[i][config.href], class: "resultlink", elements: [c("div", {
                  elements: [
                     c("h2", {text: data[i][config.title]}),
                     c("p", {text: data[i][config.description]})
                  ], class: "result"
               })]
            }))
         }
      }
      else {
         if (selection === i) {
            els.push(c("a", {
               class: "resultlink", elements: [c("div", {
                  elements: [
                     c("h2", {text: data[i][config.title]}),
                     c("p", {text: data[i][config.description]})
                  ], class: "result", id: "selected"
               })]
            }))
         }
         else {
            els.push(c("a", {
               class: "resultlink", elements: [c("div", {
                  elements: [
                     c("h2", {text: data[i][config.title]}),
                     c("p", {text: data[i][config.description]})
                  ], class: "result"
               })]
            }))
         }
      }

      els[i].addEventListener("click", () => {
         searchbarCallback(data[i])
         //kill()
      })
   }
   let el = c("div", {elements: els})
   document.getElementById("results").append(el)
}

export default initSearchBar
