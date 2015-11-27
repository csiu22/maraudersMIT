maraudersMap = undefined;

var wait_for_libraries = function() {

if ( Session.get('richmarkerReady')) { 
	if(! maraudersMap) {
		maraudersMap = Map(); 
	}
}
else setTimeout(wait_for_libraries, 500); 

}

Template.maraudersMap.rendered = wait_for_libraries;


