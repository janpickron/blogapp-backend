const express = require('express')
const app = express()
const port = 3000

// allows us to receive JSON objects
// app.use(express.json)

app.get('/', function (req, res){
   res.send("Hello Janice!")
})

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})

console.log('here')

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