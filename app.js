var express = require('express');
var Yelp = require('yelp-api-v3');
var bodyParser = require("body-parser");
var path = require('path')


var yelp = new Yelp({
  app_id: "txMAKnMIAeAOHElQpTEyuA",
  app_secret: "4yJqQck1j6FrkAYNjE5TAcv3LRxDGrOX9Bqmv8Zrh0LClppgUFWHEhdK6IymsHdp"
});

var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));




// yelp.search({
//   term: 'food',
//   location: '90007'
// })
//   .then(function(data) {
//     console.log(data);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });


app.get("/", function(req, res) {
  res.render("landing.ejs");
});

app.post("/search", function(req, res) {
  // get data from form and use it to search
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;
  // to be renamed
  var term = req.body.search;
  var searchObject = {
    term: term,
    latitude: latitude,
    longitude: longitude
  };

  yelp.search(searchObject).then(function(data) {
    console.log(data);
  });
  res.end('yes');
});


app.listen(3000, function() {
  console.log("Listening on port 3000!!!");
});