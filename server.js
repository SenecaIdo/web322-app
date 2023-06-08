/*
WEB322 - Assignment 2
Ido Papo
https://determined-jade-cobra.cyclic.app/
*/

var express = require("express");
var app = express();
var path = require("path");
const storeService = require('./store-service');

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

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);
