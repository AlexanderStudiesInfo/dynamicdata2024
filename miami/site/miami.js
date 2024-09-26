//Sections descriptions:
//About: 1 short paragraph per page
// Services: Show at least 4 services per page
// Packages: Show at least 6 packages per page 
// Gallery: Show at least 16 images per page


// imports express into our project 
const express = require('express')
//create the express server inside a vairable called app
const app = express()
//Specify static routes
app.use(express.static('public'))

//importa a package for handlebars
const expressHandlebars = require('express-handlebars')
//make express use the handlebars template engine
app.engine('handlebars',expressHandlebars.engine({
    defaultLayout:'main',
}))
app.set('view engine','handlebars')
const PORT = process.env.port || 3000
//process routs before errors
app.get('/',(request,response)=>{
    response.render('landing',{
        title:"Welcome Adventurers"
        abstract:"This is the Realm of Yether"
        image:"tavernofyether.jpg"
    })
})
app.get('/about',(request,response)=>{
    response.render('page',{
        title:"About Yether"
        abstract:"The Realms of Yether is a living world that has been in creation since 2018."
    })
})

app.get('/astralsea',(request,response)=>{
    response.render('page',{
        title:"Worlds of Yether"
        abstract:"The Realms of Yether composes a universe with many different worlds, dimensions, and planes of existence."
    })
})


app.get('/nightlife',(request,response)=>{
    response.type('text/plain')
    response.send('Miami At Night')
})
app.get('/beaches',(request,response)=>{
    response.type('text/plain')
    response.send('Miami Beach and more!')
})
//handle the error first
//NOT FOUND!
app.use( (request,response)=>{
    response.status(404)
    response.render('404')
})

//SERVER ERROR :(

app.use( (error,request,response,next)=>{
    console.log(error.message)
    response.status(500)
    response.render('500')
})

app.listen(PORT, ()=>{
    console.log('Express is running on http://localhost:${PORT}')
    console.log('Press ctrl-c to terminate')

})