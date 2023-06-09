/*
WEB322 - Assignment 2
Ido Papo
https://determined-jade-cobra.cyclic.app/
*/

var express = require("express");
var app = express();
var path = require("path");
const storeService = require('./store-service');
const items = require('./data/items');
const categories = require('./data/categories');

var HTTP_PORT = process.env.PORT || 8080;




// Call initialize function to populate data
storeService.initialize()
  .then(() => {
    // Server initialization
    app.listen(HTTP_PORT, onHttpStart);
  })
  .catch(error => {
    console.error("Error initializing the server:", error);
  });
  
// Call this function after the HTTP server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Redirect root route to "/about"
app.get("/", function(req, res) {
  res.redirect("/about");
});

// Serve the about.html file from the 'week2-assets' directory
app.get("/about", function(req, res) {
  res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/shop", function(req, res) {
  storeService.getPublishedItems()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).json({ message: err });
    });
});

app.get("/items", function(req, res) {
  storeService.getAllItems()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).json({ message: err });
    });
});

app.get("/categories", function(req, res) {
  storeService.getCategories()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).json({ message: err });
    });
});

app.use(function(req, res){
  res.status(404).send("404 page not found");
});
