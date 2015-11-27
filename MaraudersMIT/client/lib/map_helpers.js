getUserLocation = function(){
  var pos = null;
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
              };
      });
    }
  return pos;
}