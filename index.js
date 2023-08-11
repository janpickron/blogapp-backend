const express = require("express");

const port = process.env.PORT || 3000;
const menuData = require("./menu-items.json");
const fs = require("fs");

const app = express();
// allows us to receive JSON objects
app.use(express.json());

app.listen(port, () => {
  console.log(`App listening on port ${port}.`);
  console.log('Waiting for the activity')
});

// WRITE DATA into menu-items.json file
function handleJsonFileUpdate() {
  const jsonMenuData = JSON.stringify(menuData); // convert to JSON
  // adding a menu item to database
  fs.writeFile("menu-items.json", jsonMenuData, (err) => console.log(err));
}

//  GET - reading data
app.get("/", (req, res) => {
  res.send(
    `G day Janice. Checking another request on port ${port} on the browser.`
  );
  console.log('Reading data')
});

app.get("/menu", (req, res) => {
  res.send(menuData);
});

// POST - add  data
app.post("/", (req, res) => {
  menuData.push(req.body);
  handleJsonFileUpdate();
  res.send(menuData);
  console.log('Added')
});

// PUT - update a menu item by title
app.put("/", (req, res) => {
  // get the title from req query and find item on array
  const itemFound = menuData.find(
    (eachItem) => eachItem.title === req.query.title
  );
  // find the index of selected menu item
  const indexOfItem = menuData.indexOf(itemFound);
  // replace the selected menu item with new update in the req.body of ThunderClient
  menuData.splice(indexOfItem, 1, req.body);
  handleJsonFileUpdate();
  res.send(menuData);
  console.log('Updated')
});

// DELETE  - delete a menu item by title
app.delete('/', (req, res) => {
   const itemFound = menuData.find(eachItem => eachItem.title === req.query.title)

   const indexOfItem = menuData.indexOf(itemFound)
    menuData.splice(indexOfItem, 1)
    handleJsonFileUpdate()
    res.send(menuData)
    console.log('Deleted')
})

// DELETE all menu items
app.delete('/deleteAll', (req, res) => {
    // convert to JSON
    const jsonMenuData = JSON.stringify([])
    fs.writeFile('menu-items.json', jsonMenuData, err => console.log(err))
    res.sendStatus(menuData)
    console.log('All menu items are empty.')
})