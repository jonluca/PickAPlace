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


app.get("/", function(req, res) {
  res.render("landing.ejs");
});

app.post("/search", function(req, res) {
  // get data from form and use it to search
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;

  console.log(req.body);
  // to be renamed
  var term = req.body.search;

  var searchObject = {
    term: 'restaurant',
    latitude: latitude,
    longitude: longitude,
    radius: 16000,
    limit: 1
  }

  searchObject.sort_by = 'rating';
  var results = {};

  yelp.search(searchObject)
    .then(function(data) {
      // console.log(JSON.parse(data));

      results.rating = JSON.parse(data);
      searchObject.sort_by = 'distance';

      yelp.search(searchObject)
        .then(function(data) {
          results.distance = JSON.parse(data);

          console.log(results);
          res.send({
            results: results,
          });
          res.end();
        })
        .catch(function(err) {
          console.error(err);
        });
    })
    .catch(function(err) {
      console.error(err);
    });

});


app.listen(3000, function() {
  console.log("Listening on port 3000!!!");
});