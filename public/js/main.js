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
        $('.loading').css('display', 'none');
        $('.columns').css('display', 'block');
        $('.choose').css('display', 'block');
        $('.searchpage').css('display', 'none');
        console.log(data.results);
      }
    });
  }

  //search button on click
  $('#search').click(function() {
    // add loading bar

    var button = document.getElementById('search');

    $('.loading').css('display', 'block');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(sendLoc);
    } else {
      button.innerHTML = "Geolocation is not supported by this browser.";
    }

  });

});