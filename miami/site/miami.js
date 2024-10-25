// Imports express into our project 
const express = require('express')
// Create the express server inside a variable called app
const app = express()
// Specify static routes
app.use(express.static('public'))

// Import a package for handlebars
const expressHandlebars = require('express-handlebars')
// Make express use the handlebars template engine
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')
const PORT = process.env.port || 3000

const gallery = require("./data/gallery.json")
// Process routes before errors
app.get('/', (request, response) => {
    console.log(gallery)
    // Import page-specific data
    const data = require("./data/home-data.json")
    response.render('landing', {
        gallery,
        data,
        title: "Welcome to Venturers",
        abstract: "Explore the beauty and charm of Italy",
        image: "italianlandscape.jpg"
    })
})
app.get('/about', (request, response) => {
    response.render('page', {
        title: "About Italy",
        abstract: "Italy, a country known for its rich history, exquisite cuisine, and stunning landscapes."
    })
})

app.get('/services', (request, response) => {
    response.render('page', {
        title: "Our Services",
        abstract: "We offer a variety of services to make your Italian vacation unforgettable.",
        services: [
            "Guided City Tours",
            "Wine Tasting Experiences",
            "Culinary Workshops",
            "Historical Site Excursions"
        ]
    })
})

app.get('/packages', (request, response) => {
    response.render('page', {
        title: "Travel Packages",
        abstract: "Choose from a variety of packages tailored to explore the best of Italy.",
        packages: [
            "Rome and Vatican City Experience",
            "Tuscany Countryside Getaway",
            "Amalfi Coast Adventure",
            "Venetian Lagoon Tour",
            "Cinque Terre Coastal Retreat",
            "Sicily Cultural Journey"
        ]
    })
})

app.get('/nightlife', (request, response) => {
    response.type('text/plain')
    response.send('Experience the vibrant nightlife of Rome, Milan, and Florence!')
})
app.get('/beaches', (request, response) => {
    response.type('text/plain')
    response.send('Discover the beautiful beaches along the Amalfi Coast, Sardinia, and more!')
})
// Handle the error first
// NOT FOUND!
app.use((request, response) => {
    response.status(404)
    response.render('404')
})

// SERVER ERROR :(
app.use((error, request, response, next) => {
    console.log(error.message)
    response.status(500)
    response.render('500')
})

app.listen(PORT, () => {
    console.log(`Express is running on http://localhost:${PORT}`)
    console.log('Press ctrl-c to terminate')
})
