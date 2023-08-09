const express = require("express");

const port = process.env.PORT || 3000;
const http = require("http");
const menuData = require("./menu-items.json");
const fs = require("fs");

const app = express();
// allows us to receive JSON objects
app.use(express.json)

app.listen(port, () => {
  console.log(`Console.log - Example app listening on port ${port}!`);
});

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

// WRITE DATA into menu-items.json file
function handleJsonFileUpdate() {
  const jsonMenuData = JSON.stringify(menuData); // convert to JSON
  // adding a menu item to database
  fs.writeFile("menu-items.json", jsonMenuData, err => console.log(err));
}

//  GET - reading data
app.get("/", (req, res) => {
  res.send(
    `Hello Jan! sending to the browser. I added another sentence on port ${port}.`
  );
});

app.get("/menu", (req, res) => {
  res.send(menuData);
});

// POST - add  data
app.post("/", (req, res) => {
  menuData.push(req.body);
  handleJsonFileUpdate()
  res.send(menuData)
});
console.log("Console.log here");

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
