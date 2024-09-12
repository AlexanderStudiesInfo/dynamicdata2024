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
//In order to access local files, we need to work with the file system

const fs = require("fs")
//Define the port the app will be accesssed from (80,8080,8888 are default to the domain /)
const PORT = process.env.PORT || 8080; 
//The HTTP module can create an HTTP server that listens to server ports and gives a response back to the client

//Use the createServer() method to create an HTTP server: 
function handlerRequest(request,response) {
    response.writeHead(200, { "Content-Type" : "Text/Plain"})
    response.end("Hello World")
}

//the callback is a function which executes after something else has completed
//syntax to create a function
const functionName = (parameter1, parameter2, parameter3) => {
    //write the code to be executed by the function
    console.log("functionName was called")
    console.log(parameter1)
    console.log(parameter2)
    console.log(parameter3)
}
//Create a function to read files and dispaly them
const displayPage = (path,res,contentType, responseCode = 200) => {
    fs.readFile(__dirname + path , (errors,content) => {
        if(errors){
            res.writeHead(500,{'Content-type':'text/plain'})
            return res.end('500 - Internal Error')
        }
        res.writeHead(responseCode, {"Content-Type": 
        contentType})
        res.end(content)
    })
}

//"public/home.html"

//use the createServer() method to create an HTTP server:
const server = http.createServer( (request,response) => {
    console.log(request.url)
    console.log(request.method)
    //GET POST PUT DELETE
    //GET => READ OPERATION OF A DATABASE
    //POST => CREATE "" ""
    //PUT => UPDATE
    //DELETE => DELETE

    //How to respond to requests...
    var path = request.url
    //ROUTING
    switch(path) {
        case ' ':
        case '/':
        displayPage('/public/home.html',response,'text/html')
        break
        case '/about':
        displayPage('/public/about.html',response,'text/html')
        break
        case '/contact':
        displayPage('/public/contact.html',response,'text/html')
        break
        case '/logo':
        displayPage('/public/image.png',response,'image/png')
        break
        default:
        displayPage('/public/404.html',response,'text/html',404)
        break
    }

    // if(request.url == "/") {
    //     //execute the statement
    //     response.writeHead(200 , { "Content-Type":"Text/Plain"})
    //     response.end("Home Page")
    // }else if(request.url == "/contact") {
    //     //execute the statement
    //     response.writeHead(200 , { "Content-Type":"Text/Plain"})
    //     response.end("Contact Page")
    // }else if(request.url == "/about") {
    //     //execute the statement
    //     response.writeHead(200 , { "Content-Type":"Text/Plain"})
    //     response.end("About Page")
    // }else if(request.url == "/gallary") {
    //     //execute the statement
    //     response.writeHead(200 , { "Content-Type":"Text/HTML"})
    //     response.end("<html><head><title>Page Title </title></head><body><h1>My first HTML response</h1></body></html>")
    // }else{
    //     response.writeHead(400 , { "Content-Type" : "Text/Plain"})
    //     response.end("Page not found error 400")
    // }


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

})

//start the server
server.listen(PORT, () => console.log(' server started on port http://localhost:${PORT} press ctrl + c to terminate' ))

//server.listen(PORT)