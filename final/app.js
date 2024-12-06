// Run the following commands in terminal:
// npm install express
// npm install express-handlebars 
// if you have errors, run   
// sudo npm install express
// sudo npm install express-handlebars  

//Initialize Express
const express = require('express')

//add the handlebars view engine 
const expressHandlebars = require('express-handlebars') 

const app = express()

//configure our express app to use handlebars
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))

app.set('view engine','handlebars')
//ends handlebar configuration

const port = process.env.port || 3000

//Setup routes
app.get("/",(req,res)=>{
    const data = require('./data/homepage.json') 
    res.render('homepage',{data})
})

app.get("/about",(req,res)=>{
    const data = require('./data/about.json') 
    res.render('page',{data})
})
// all category pages
app.get("/weapons",(req,res)=>{
    const data = require('./data/weapons.json') 
    res.render('category',{data})
})
app.get("/armors",(req,res)=>{
    const data = require('./data/armors.json') 
    res.render('category',{data})
})
app.get("/consumables",(req,res)=>{
    const data = require('./data/consumables.json') 
    res.render('category',{data})
})
app.get("/arcana",(req,res)=>{
    const data = require('./data/arcana.json') 
    res.render('category',{data})
})
//details page
app.get("/weapons/details/:id",(req,res)=>{

    let data = {};
    

    const data = require('./data/weapons.json') 
    
    console.log(data)
    // filter the data to get only the data that matches the id
    // temporary filter
    var tempData = {"products":[]}
    tempData.products = data.products.filter((product)=>{
        return product.id == req.params.id
    })
    console.log("data filter")
    console.log(data)

    res.render('details',{"data":tempData})
})
app.get("/armors/details/:id",(req,res)=>{

    let data = {};
    

    const data = require('./data/armors.json') 
    
    console.log(data)
    // filter the data to get only the data that matches the id
    // temporary filter
    var tempData = {"products":[]}
    tempData.products = data.products.filter((product)=>{
        return product.id == req.params.id
    })
    console.log("data filter")
    console.log(data)

    res.render('details',{"data":tempData})
})
app.get("/consumables/details/:id",(req,res)=>{

    let data = {};
    

    const data = require('./data/consumables.json') 
    
    console.log(data)
    // filter the data to get only the data that matches the id
    // temporary filter
    var tempData = {"products":[]}
    tempData.products = data.products.filter((product)=>{
        return product.id == req.params.id
    })
    console.log("data filter")
    console.log(data)

    res.render('details',{"data":tempData})
})
app.get("/arcana/details/:id",(req,res)=>{

    let data = {};
    

    const data = require('./data/arcana.json') 
    
    console.log(data)
    // filter the data to get only the data that matches the id
    // temporary filter
    var tempData = {"products":[]}
    tempData.products = data.products.filter((product)=>{
        return product.id == req.params.id
    })
    console.log("data filter")
    console.log(data)

    res.render('details',{"data":tempData})
})


let cart = {"products":[]}

app.get("/cart",(req,res) =>{
    if(typeof(req.query.id) != "undefined") {
        cart.products.push(req.query)
        console.log(req)
        console.log(req.query.name)
    } else {
        console.log(req)
        console.log(req.query.id)
        console.log(req.query.name)
    }

    res.render("cart",{"products":cart.products})
})


//Error handling ->  app.use() basic express route 
app.use((req,res) => {
    res.status(404)
    res.render('404')
})

//Server Error 500
app.use((error,req,res,next) => {
    console.log(error.message)
    res.status(500)
    res.render('500') 
}) 
// setup listener
app.listen(port,()=>{
    console.log(`Server started http://localhost:${port}`)
    //console.log('Server starter http://localhost:'+port)
    console.log('To close pres Ctrl-C')
})
