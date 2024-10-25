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

// Process routes before errors

app.get('/rome', (request, response) => {
    response.render('rome', {
        title: "Rome",
        abstract: "Explore the ancient history of Rome, the eternal city.",
        data: {
            about: "Rome is the capital city of Italy, known for its nearly 3,000 years of globally influential art, architecture, and culture.",
            services: ["Guided Colosseum Tours", "Vatican Museum Visits"],
            packages: [
                { name: "Ancient Rome Tour", description: "Visit the Colosseum, Roman Forum, and Palatine Hill.", price: "$150" },
                { name: "Vatican City Experience", description: "Explore the Vatican Museums and St. Peter's Basilica.", price: "$200" }
            ]
        },
        gallery: { images: ["colosseum-at-night.jpg", "roman forum.jpeg"] }
    });
});

app.get('/venice', (request, response) => {
    response.render('venice', {
        title: "Venice",
        abstract: "Discover the canals and beauty of Venice, a floating city of wonder.",
        data: {
            about: "Venice, known for its canals, gondolas, and historic landmarks like St. Mark’s Basilica.",
            services: ["Gondola Rides", "St. Mark’s Basilica Tours"],
            packages: [
                { name: "Canal Tour", description: "A scenic gondola ride through Venice's famous canals.", price: "$120" },
                { name: "Venetian Art Tour", description: "Explore the art and history of Venice.", price: "$180" }
            ]
        },
        gallery: { images: ["gondolas-on-the-grand-canal.jpeg", "rialto-bridge.jpg"] }
    });
});

app.get('/florence', (request, response) => {
    response.render('florence', {
        title: "Florence",
        abstract: "Experience the Renaissance in Florence, the city of art and culture.",
        data: {
            about: "Florence is the birthplace of the Renaissance and home to masterpieces like Michelangelo’s David.",
            services: ["Uffizi Gallery Tours", "Florence Cathedral Visits"],
            packages: [
                { name: "Renaissance Art Tour", description: "Explore the Uffizi Gallery and see Michelangelo’s David.", price: "$140" },
                { name: "Florence Cathedral Tour", description: "Visit the famous Florence Cathedral and its Dome.", price: "$160" }
            ]
        },
        gallery: { images: ["florence-cathedral-duomo.jpeg", "michelangelo-david.jpg"] }
    });
});

app.get('/tuscany', (request, response) => {
    response.render('tuscany', {
        title: "Tuscany",
        abstract: "Bask in the rolling hills and vineyards of Tuscany, a region of natural beauty.",
        data: {
            about: "Tuscany is known for its picturesque landscapes, world-class wines, and charming hilltop towns.",
            services: ["Wine Tasting Tours", "Countryside Retreats"],
            packages: [
                { name: "Chianti Wine Tour", description: "Taste the best wines of Tuscany in the Chianti region.", price: "$130" },
                { name: "Countryside Escape", description: "Enjoy a relaxing retreat in Tuscany’s beautiful countryside.", price: "$170" }
            ]
        },
        gallery: { images: ["lush-vineyard-hills.jpg", "san-gimignano.jpg"] }
    });
});


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
