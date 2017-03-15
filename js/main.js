$(document).ready(function() {
  function getLocation() {
    var x = document.getElementById("loc");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  function showPosition(position) {
    var x = document.getElementById("loc");

    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
  }

  //search button on click
  $('#search').click(function() {


    //t add loading bar
    $('.loading').css('display', 'block');

    var artistId = $('#searchbar').val();
    var artistName = $('#select2-searchbar-container > option').html();

    totalLyrics = "";
    getSongs(artistId, function(data, code, jqXHR) {
      //should return up to 10 elements in json array
      var songs = JSON.parse(data);
      var fullSongList = [];
      for (var i = 0; i < songs.length; i++) {
        //remove unaccepted chars, remove featured
        var song = cleanSong(songs[i]);
        //add song to json array
        fullSongList.push(song);
      }
      getLyrics(artistName, fullSongList);
    });
  });

  $('#demo').click(function() {
    getLocation();
  });
});