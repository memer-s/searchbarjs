# Searchbar.js

Here you can see a minimal setup

```javascript
const data = [
{name: "result 1", path: "http://localhost:2000", description: 'descriptionbruh', blablabla: 'asdfasd'},
{name: "result 2", path: "http://localhost:3000/bruh", description: 'descriptionbruh', blablabla: 'asdfd'},
]

const config = {
   placeholder: "Search notes", // placeholder in the searchbox.
   searchKey: "name", // what property is searched for.
   href: "path", // The link to the result.
   titleKey: "name", // The results title.
   descKey: "description" // The results description.
}

initSearchBar(data, config, (result) => {
   // this code executes when enter is clicked.
   // result is the clicked results object
   // like: {name: "result 1", path: "http://localhost:2000", description: 'descriptionbruh', blablabla: 'asdfasd'},
   
   window.location.pathname = result.path
})
```
