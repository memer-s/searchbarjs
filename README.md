# Searchbar.js

Here you can see a minimal setup (OUTDATED)

```javascript
const data = [
   {name: "result 1", path: "http://localhost:2000", description: 'descriptionbruh', blablabla: 'asdfasd'},
   {name: "result 2", path: "http://localhost:3000/bruh", description: 'descriptionbruh', blablabla: 'asdfd'},
]

const config = {
   name: "Search notes", // placeholder in the searchbox.
   searchKey: "name", // what property is searched for.
   href: "path", // The link to the result.
   title: "name", // The results title.
   description: "description" // The results description.
}

const searchbar = initSearchBar(data, config, (result) => {
   // this code executes when enter is clicked.
   // result is the clicked results object
   // like: {name: "result 1", path: "http://localhost:2000", description: 'descriptionbruh', blablabla: 'asdfasd'},
   
   window.location.pathname = result.path
})

// The searchbar has 3 functions.
searchbar.hide() // hides it
searchbar.show() // shows it
searchbar.destroy() // removes the instance
```

|Config|Description|
|------|-----------|
|name|Placeholder in the searchbox.|
|searchKey|The property on the data object that is being queried for.|
|href|The property that is being used in the `<a href>`.|
|title|The property that is used for the title in the searchbar.|
|description|The property that is used for the description on the searchbar.|
|maxResults|The maximum number of results for a query.|
