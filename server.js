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

// call this function after the http server starts listening for requests
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
  const publishedItems = items.filter(item => item.published === true);
  res.json(publishedItems);
});

  app.get("/items", function(req, res) {
  res.json(items);
});

app.get("/categories", function(req, res) {
  res.json(categories);
});

app.use(function(req, res){
  res.status(404).send("page not found");
});
