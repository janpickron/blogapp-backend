const express = require('express')
const app = express()
const port = 3000
const http = require('http')

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

// allows us to receive JSON objects
// app.use(express.json)

app.get('/', (req, res) => {
   res.send("Hello Janice! sending to the browser. ")
})

app.listen(port, () => {
    console.log(`Console.log - Example app listening on port ${port}!`)
})

console.log('Console.log here')



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