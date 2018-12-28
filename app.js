var express = require('express');
var Yelp = require('yelp-api-v3');
var bodyParser = require("body-parser");
var path = require('path');
var helmet = require('helmet');
var config = require('./config');

var yelp = new Yelp({
    app_id: config.app_id,
    app_secret: config.app_secret
});


var app = express();
app.use(helmet({xssFilter: false}));

function convertToMiles(meters) {
    var m = parseInt(meters);
    return Math.round(m * .0621371) / 100 + " miles";
}

app.use(bodyParser.urlencoded({
    extended: true
}));



app.set("view engine", "ejs");
app.use('/', express.static(path.join(__dirname, 'public')));


app.get("/", function(req, res) {
    res.render("landing.ejs");
});


var results = {};

app.post("/search", function(req, res) {
    // get data from form and use it to search
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    // var results = {};
    var searches = [];
    const searchByRating = {
        term: 'restaurant',
        latitude: latitude,
        longitude: longitude,
        radius: 4000,
        limit: 1,
        open_now: true,
        sort_by: 'rating'
    };

    const searchByDistance = {
        term: 'restaurant',
        latitude: latitude,
        longitude: longitude,
        radius: 4000,
        limit: 1,
        open_now: true,
        sort_by: 'distance'
    };

    const searchByPrice = {
        term: 'restaurant',
        latitude: latitude,
        longitude: longitude,
        radius: 4000,
        open_now: true,
        limit: 1,
        sort_by: 'best_match',
        price: '1'
    };


    var ratingSearch = yelp.search(searchByRating);
    var distanceSearch = yelp.search(searchByDistance);
    var priceSearch = yelp.search(searchByPrice);

    searches.push(ratingSearch);
    searches.push(distanceSearch);
    searches.push(priceSearch);

    Promise.all(searches).then(function(data) {
        results.rating = JSON.parse(data[0]).businesses[0];
        results.distance = JSON.parse(data[1]).businesses[0];
        results.price = JSON.parse(data[2]).businesses[0];
        // convert distances to mile strings
        results.rating.distance = convertToMiles(results.rating.distance);
        results.distance.distance = convertToMiles(results.rating.distance);
        results.price.distance = convertToMiles(results.price.distance);

        var url_prepend = "http://maps.google.com?q=";
        // get uri encodings
        results.rating.uri = url_prepend + results.rating.coordinates.latitude + "," + results.rating.coordinates.longitude;
        results.distance.uri = (url_prepend + results.distance.coordinates.latitude + "," + results.distance.coordinates.longitude);
        results.price.uri = (url_prepend + results.price.coordinates.latitude + "," + results.price.coordinates.longitude);

        console.log(results);
        res.send({
            results: results,
            redirect: 'results'
        });
        res.end();
    });
});

app.get("/results", function(req, res) {
    // res.render("results.ejs", {results: results});
    res.render("results.ejs", {
        rating: results.rating,
        distance: results.distance,
        price: results.price
    });
});


app.listen(8081, 'localhost', function() {
    console.log("Listening on port 8081!");
});