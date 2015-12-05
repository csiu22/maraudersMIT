maraudersMap = undefined;

var wait_for_libraries = function() {

if ( Session.get('richmarkerReady')) {
	maraudersMap = Map();
	maraudersMap.renderMap();
	setInterval(maraudersMap.refresh, 60000);
}
else setTimeout(wait_for_libraries, 500);

}

Template.maraudersMap.rendered = wait_for_libraries;


