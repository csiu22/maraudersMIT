Session.set('custommarkerReady', false);

$.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAmUWvkqoAwT70st_eiDUo0xcnIcUGgo9g', function(){
  Session.set('custommarkerReady', true);
 });


// Session.set('richmarkerReady', false);


// $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAmUWvkqoAwT70st_eiDUo0xcnIcUGgo9g', function(){
//     $.getScript('https://google-maps-utility-library-v3.googlecode.com/svn-history/r435/trunk/richmarker/src/richmarker-compiled.js', function(){
//         Session.set('richmarkerReady', true);
//   });
//  });