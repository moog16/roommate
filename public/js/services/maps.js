angular.module('rm.maps.service', []).factory("mapsInit", function() {
    var initialize = function() {

      // var mapOptions = {
      //   center: new google.maps.LatLng(-33.8688, 151.2195),
      //   zoom: 13,
      //   mapTypeId: google.maps.MapTypeId.ROADMAP
      // };
      // var map = new google.maps.Map(document.getElementById('map-canvas'),
      //   mapOptions);

      var input = (document.getElementById('searchTextField'));
      var autocomplete = new google.maps.places.Autocomplete(input);

      // autocomplete.bindTo('bounds', map);

      // var infowindow = new google.maps.InfoWindow();
      // var marker = new google.maps.Marker({
      //   map: map
      // });

      google.maps.event.addListener(autocomplete, 'place_changed', function() {
        // infowindow.close();
        // marker.setVisible(false);
        input.className = '';
        var place = autocomplete.getPlace();
        console.log(place);
        if (!place.geometry) {
          // Inform the user that the place was not found and return.
          input.className = 'notfound';
          return;
        }

        // // If the place has a geometry, then present it on a map.
        // if (place.geometry.viewport) {
        //   map.fitBounds(place.geometry.viewport);
        // } else {
        //   map.setCenter(place.geometry.location);
        //   map.setZoom(17);  // Why 17? Because it looks good.
        // }
        // marker.setIcon(/* @type {google.maps.Icon}*/ ({
        //   url: place.icon,
        //   size: new google.maps.Size(71, 71),
        //   origin: new google.maps.Point(0, 0),
        //   anchor: new google.maps.Point(17, 34),
        //   scaledSize: new google.maps.Size(35, 35)
        // }));
        // marker.setPosition(place.geometry.location);
        // marker.setVisible(true);

        // infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);  //deleted address
        // infowindow.open(map, marker);
      });

    };

    return initialize;
});