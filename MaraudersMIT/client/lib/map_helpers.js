
/*

Function that returns the location of the current user, if it is available

*/

getUserLocation = function(successfunc) {

  function errfunc(err){
      alert( 'Error: The Geolocation service failed.');
   }

   if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
          var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
          successfunc(pos);
        }, errfunc);
    } else {
        errfunc();
        return undefined;
    }
       
}