// Import dependencies
const express = require('express');
const expressHandlebars = require('express-handlebars');
const path = require('path');

// Initialize Express
const app = express();

// Set up the Handlebars view engine
app.engine(
    'handlebars',
    expressHandlebars.engine({
        defaultLayout: 'main',
        layoutsDir: path.join(__dirname, 'views', 'layouts'),
        partialsDir: path.join(__dirname, 'views', 'partials'),
    })
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Set the static folder for serving CSS, JS, and images
app.use(express.static(path.join(__dirname, 'public')));

// Define the port
const port = process.env.PORT || 3000;

// Routes
app.get("/", (req, res) => {
    const data = require('./data/homepage.json');
    res.render('homepage', data);
});

app.get("/about", (req, res) => {
    const data = require('./data/about.json');
    res.render('page', data);
});

// Category routes
const categories = ['weapons', 'armors', 'consumables', 'arcana'];

categories.forEach(category => {
    // Route for listing category items
    app.get(`/${category}`, (req, res) => {
        const data = require(`./data/${category}.json`);
        res.render('category', data);
    });

    // Route for item details in category
    app.get(`/${category}/details/:id`, (req, res) => {
        const data = require(`./data/${category}.json`);
        const product = data.product.find(product => product.id == req.params.id);

        if (product) {
            res.render('details', { product });  // Changed 'products' to 'product' to match the variable
        } else {
            res.status(404).render('404', { message: "Product not found" });
        }
    });
});

// Cart routes
let cart = { product: [] };

app.get("/cart", (req, res) => {
    if (req.query.id) {
        const product = { id: req.query.id, name: req.query.name, price: req.query.price };
        cart.product.push(product);
    }
    res.render("cart", { product: cart.products });
});

// Error handling for unknown routes
app.use((req, res) => {
    res.status(404).render('404', { message: "Page not found" });
});

// Error handling middleware for server errors
app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).render('500', { message: "Internal server error" });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log('To close the server, press Ctrl-C');
});
