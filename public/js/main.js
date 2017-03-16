$(document).ready(function() {

  function sendLoc(position) {
    $.ajax({
      method: 'POST',
      url: "/search",
      type: 'json',
      data: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      success: function(data, code, jqXHR) {

        /*Hide loading icon, title, and button in that order*/
        $('.loading').css('display', 'none');
        $('#title').css('display', 'none');
        $('.searchpage').css('display', 'none');

        var rating = data.results["rating"];
        var distance = data.results["distance"];

        console.log(distance);
        /*Show three columns and new title*/
        $('.choose').css('display', 'block');

        $('.columns').css('display', 'block');


      }
    });
  }



  //search button on click
  $('#search').click(function() {
    // add loading bar

    var button = document.getElementById('search');

    $('.loading').css('display', 'block');

    if (navigator.geolocation) {
      // navigator.geolocation.getCurrentPosition(sendLoc);
      $.ajax({
        method: 'POST',
        url: "/search",
        type: 'json',
        data: {
          latitude: '34.0290238',
          longitude: '-118.2721847',
        },
        success: function(data, code, jqXHR) {

          /*Hide loading icon, title, and button in that order*/
          $('.loading').css('display', 'none');
          $('#title').css('display', 'none');
          $('.searchpage').css('display', 'none');

          var rating = data.results["rating"];
          var distance = data.results["distance"];
          var price = data.results["price"];
          /*Show three columns and new title*/
          $('.choose').css('display', 'block');

          $('.columns').css('display', 'block');

          console.log(rating)

          $('#distanceImage').css("background-image", "url(" + distance["image_url"] + ")");
          $('#ratingImage').css("background-image", "url(" + rating["image_url"] + ")");
          $('#priceImage').css("background-image", "url(" + price["image_url"] + ")");

          $('#goPrice').click(function() {
            var name = price["name"];
            var win = window.open('https://www.google.com/maps?q=' + encodeURIComponent(name), '_blank');
            if (win) {
              //Browser has allowed it to be opened
              win.focus();
            } else {
              //Browser has blocked it
              alert('Please allow popups for this website');
            }
          })

          $('#goRating').click(function() {
            var name = rating["name"];
            var win = window.open('https://www.google.com/maps?q=' + encodeURIComponent(name), '_blank');
            if (win) {
              //Browser has allowed it to be opened
              win.focus();
            } else {
              //Browser has blocked it
              alert('Please allow popups for this website');
            }
          })

          $('#goDistance').click(function() {
            var name = distance["name"];
            var win = window.open('https://www.google.com/maps?q=' + encodeURIComponent(name), '_blank');
            if (win) {
              //Browser has allowed it to be opened
              win.focus();
            } else {
              //Browser has blocked it
              alert('Please allow popups for this website');
            }
          })

          $('#priceRest').text(price["name"])
          $('#distRest').text(distance["name"])
          $('#rateRest').text(rating["name"])

          $('#distPrice').text("Price: " + distance["price"])
          $('#ratePrice').text("Price: " + rating["price"] + '\n' + rating["phone"] + '\n' + "Rating: " + rating["rating"])
          $('#pricePrice').text("Price: " + price["price"])

        }
      });
    } else {
      button.innerHTML = "Geolocation is not supported by this browser.";
    }

  });

});