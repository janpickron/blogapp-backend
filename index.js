const express = require("express");

const port = process.env.PORT || 3000;
const http = require("http");
const menuData = require("./menu-items.json");
const fs = require("fs");

const app = express();
// allows us to receive JSON objects
app.use(express.json());

app.listen(port, () => {
  console.log(`Console.log - Example app listening on port ${port}!`);
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
    `Hello Jan! I added another sentence on port ${port} on the browser.`
  );
});

app.get("/", (req, res) => {
  res.send(menuData);
});

// POST - add  data
app.post("/", (req, res) => {
  menuData.push(req.body);
  handleJsonFileUpdate();
  res.send(menuData);
  console.log('successfully updated')
});

// PUT - update
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
});
// const http = require("http")
// const hostname = "127.0.0.1"
// const port = 3000

// const server = http.createServer(function (req, res){
//     res.writeHead(200, {"Content-Type": "text/plain"})

//     res.end("Hello World\n")
// })

// server.listen(port, hostname, function (){
//     console.log(`Server running at http://${hostname}:${port}/`)
// })

// ------------------------------
// const server = http.createServer((req,res) => {
//     if (req.url === '/') {
//         res.write('Hello World')
//         res.end()
//     }

//     if (req.url === '/api/courses') {
//         res.write(JSON.stringify([1, 2, 3]))
//         res.end()
//     }
// })
// server.listen(3000)
