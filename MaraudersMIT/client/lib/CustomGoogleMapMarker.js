makeCustomMarker = function() {

function CustomMarker(latlng, map, args) {
  this.latlng = latlng;
  this.args = args;
  this.setMap(map);

  this.current_width = 50;
  this.current_height = 50;
}

CustomMarker.prototype = new google.maps.OverlayView();

CustomMarker.prototype.draw = function() {

  var self = this;

  var div = this.div;

  if (!div) {

    div = this.div = document.createElement('div');

    div.id = 'marker';

    div.style.position = 'absolute';
    div.style.cursor = 'pointer';
    div.style.width = self.current_width + 'px';
    div.style.height = self.current_height + 'px';

    div.style.cursor = 'pointer';

    var availability = self.args.availability;
    console.log(self.args.availability);
    if (availability == 'busy') {
      div.style.borderColor = 'red';
    } else if (availability == 'available') {
      div.style.borderColor = 'green';
    } else {
      div.style.borderColor = 'turquoise';
    }

    var image_container = document.createElement('div');
    image_container.className = 'image_container';

    var img = document.createElement('img');
    img.className = "marker_image";
    img.src = self.args.img;

    var name_container = document.createElement('div');
    name_container.className = 'name_container';

    var text = document.createElement('p');
    text.innerText = self.args.name;
    text.className = 'text';

    div.appendChild(name_container);
    name_container.appendChild(text);
    div.appendChild(image_container);
    image_container.appendChild(img);


    if (typeof(self.args.marker_id) !== 'undefined') {
      div.dataset.marker_id = self.args.marker_id;
    }

    google.maps.event.addDomListener(div, "click", function(event) {
      // alert('You clicked on a custom marker!');
      google.maps.event.trigger(self, "click");

      // div.style.width = '300px';
      // div.style.height = '300px';

      // self.current_width = 300;
      // self.current_height = 300;

      // div.style.left = (point.x - (self.current_width/2)) + 'px';
      // div.style.top = (point.y - (self.current_height+25)) + 'px';

      // // div_pointer.style.left = '137.5px';
      // // div_pointer.style.top = '300px';

      // div.classList.add('large');

    });

    var panes = this.getPanes();
    panes.overlayImage.appendChild(div);
  }

  var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

  if (point) {
    div.style.left = (point.x - 10) + 'px';
    div.style.top = (point.y - 20) + 'px';

    // div.style.left = (point.x - (self.current_width/2)) + 'px';
    // div.style.top = (point.y - (self.current_height+25)) + 'px';
  }
};

CustomMarker.prototype.remove = function() {
  if (this.div) {
    this.div.parentNode.removeChild(this.div);
    this.div = null;
  }
};

CustomMarker.prototype.getPosition = function() {
  return this.latlng;
};

return CustomMarker;

}