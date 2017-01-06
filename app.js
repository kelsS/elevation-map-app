function initMap() {
    "use strict";
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: 34.5133, lng: -94.1629}
  });
      
var geocoder = new google.maps.Geocoder();

 document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
    
 document.getElementById('map').addEventListener('click', function(e) {
    placeMarkerAndPanTo(e.latLng, map);
  });
    
var elevator = new google.maps.ElevationService;
var infowindow = new google.maps.InfoWindow({map: map});
    
map.addListener('click', function(event) {
    displayLocationElevation(event.latLng,    elevator, infowindow);
    });
}


function displayLocationElevation(location, elevator, infowindow) {
  elevator.getElevationForLocations({
    'locations': [location]
  }, function(results, status) {
    infowindow.setPosition(location);
    if (status === google.maps.ElevationStatus.OK) {
      if (results[0]) {

        infowindow.setContent('The elevation here: ' +
            results[0].elevation + ' meters.');
      } else {
        infowindow.setContent('No results found');
      }
    } else {
      infowindow.setContent('Elevation service failed due to: ' + status);
    }
  });
};


function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode unsuccessful:  ' + status);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

function loadScript() {
  var script = document.createElement("script");
  script.src = "http://maps.googleapis.com/maps/api/js?callback=initialize";
  document.body.appendChild(script);
}

window.onload = loadScript;