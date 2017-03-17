$(document).ready(function() {
    function locationFailed(err) {
      console.log(err)
    }

    function sendLoc(position) {
      $.ajax({
        method: 'POST',
        url: "/search",
        type: 'json',
        data: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        success: function(data, textStatus, jqXHR){
          window.location = data.redirect
        }
      });
    }

    $('#search').click(function() {
      // add loading bar
      var button = document.getElementById('search');

      $('.loading').css('display', 'block');

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendLoc, locationFailed, {
          timeout: 10000,
          maximumAge: 180000
        });
      }
      else {
        button.innerHTML = "Geolocation is not supported by this browser.";
      }
    });
});