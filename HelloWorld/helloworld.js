//Setup our server

//A few ways of delcaring variables
var name = "john"
var age = 23.5
let lastName = "Smith"
const year = 2024
//JavaScript Object Notation AKA JSON printer.color
var printer = {
    color:"black",
    size:"small",
    price:"29.99"
}
//Node.js has a built-in module called HTTP, which allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP)

const http = require('http');//Puts the required module into a contant called http
//Define the port the app will be accesssed from (80,8080,8888 are default to the domain /)

const PORT = process.env.PORT || 8080; 
//The HTTP module can create an HTTP server that listens to server ports and gives a response back to the client

//Use the createServer() method to create an HTTP server: 
function handlerRequest(request,response) {
    response.writeHead(200, { "Content-Type" : "Text/Plain"})
    response.end("Hello World")
}

const server = http.createServer( (request,response) => {
    console.log("*****************")
    console.log("*****************")

    console.log(request.url)
    console.log(request.method)
    //GET POST PUT DELETE
    //GET => READ OPERATION OF A DATABASE
    //POST => CREATE "" ""
    //PUT => UPDATE
    //DELETE => DELETE

    //How to respond to requests...
    //ROUTING
    if(request.url == "/") {
        //execute the statement
        response.writeHead(200 , { "Content-Type":"Text/Plain"})
        response.end("Home Page")
    }else if(request.url == "/contact") {
        //execute the statement
        response.writeHead(200 , { "Content-Type":"Text/Plain"})
        response.end("Contact Page")
    }else if(request.url == "/about") {
        //execute the statement
        response.writeHead(200 , { "Content-Type":"Text/Plain"})
        response.end("About Page")
    }else if(request.url == "/gallary") {
        //execute the statement
        response.writeHead(200 , { "Content-Type":"Text/HTML"})
        response.end("<html><head><title>Page Title </title></head><body><h1>My first HTML response</h1></body></html>")
    }else{
        response.writeHead(400 , { "Content-Type" : "Text/Plain"})
        response.end("Page not found error 400")
    }
    //Basic Conditions: 
    /**
     * Equals: a == b (Equals sign twice because = by itself is an assignment operator)
     * Not Equals: if a != b 
     * Greater than: if a > b
     * Less than: if a < b 
     * Greater than or equal: if a >= b
     * Lesser than or equal: if a <= b
     */

    console.log("Respond to request")


    console.log("*****************")
    console.log("*****************")
})

//start the server
server.listen(PORT, () => console.log(' server started on port http://localhost:${PORT} press ctrl + c to terminate' ))

//server.listen(PORT)