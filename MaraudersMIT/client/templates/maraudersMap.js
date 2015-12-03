maraudersMap = undefined;
CustomMarker = null;

var wait_for_libraries = function() {

if ( Session.get('custommarkerReady')) {
  CustomMarker = makeCustomMarker();
	maraudersMap = Map();
	maraudersMap.renderMap();
}
else setTimeout(wait_for_libraries, 500);

}

Template.maraudersMap.rendered = wait_for_libraries;


