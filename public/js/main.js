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
        console.log('success');
        $('.loading').css('display', 'none');

      }
    });
  }

  //search button on click
  $('#search').click(function() {
    // add loading bar

    var button = document.getElementById('search');

    $('.loading').css('display', 'block');

    if (navigator.geolocation) {
      console.log('supported');
      navigator.geolocation.getCurrentPosition(sendLoc);
    } else {
      button.innerHTML = "Geolocation is not supported by this browser.";
      console.log('not supported');
    }

  });

});