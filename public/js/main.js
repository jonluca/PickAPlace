$(document).ready(function() {
    function locationFailed(err) {
        console.log(err);
        $("#error").text("Unable to get location! Please try again!");
    }

    function sendLoc(position) {
        $.ajax({
            method: 'POST',
            url: "/PickAPlace/search",
            type: 'json',
            data: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            },
            success: function(data, textStatus, jqXHR) {
                window.location = data.redirect;
            }
        });
    }

    $('#search').click(function() {
        // add loading bar
        var button = document.getElementById('search');
        $("#error").text("Loading, may take a while!");


        $('.loading').css('display', 'block');

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(sendLoc, locationFailed, {
                timeout: 10000000
            });
        } else {
            button.innerHTML = "Geolocation is not supported by this browser.";
        }
    });
});
