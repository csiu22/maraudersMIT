var wait_for_libraries = function() {

if ( Session.get('richmarkerReady')) renderMap();
else setTimeout(wait_for_libraries, 500); 

}

Template.maraudersMap.rendered = wait_for_libraries;

