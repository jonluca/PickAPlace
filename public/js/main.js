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

        $('#distanceImage').src = distance["businesses"][0]["image_url"];

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

          console.log(distance);
          /*Show three columns and new title*/
          $('.choose').css('display', 'block');

          $('.columns').css('display', 'block');

          $('#distanceImage').src = distance["businesses"][0]["image_url"];

        }
      });
    } else {
      button.innerHTML = "Geolocation is not supported by this browser.";
    }

  });

});