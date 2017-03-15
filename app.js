var Yelp = require('yelp-api-v3');

var yelp = new Yelp({
	app_id: "txMAKnMIAeAOHElQpTEyuA",
	app_secret: "4yJqQck1j6FrkAYNjE5TAcv3LRxDGrOX9Bqmv8Zrh0LClppgUFWHEhdK6IymsHdp"
});

yelp.search({ term: 'food', location: '90007'})
.then(function (data){
	console.log(data);
})
.catch(function (err){
	console.log(err);
});