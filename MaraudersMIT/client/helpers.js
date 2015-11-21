Handlebars.registerHelper('activePage', function() {
  // includes Spacebars.kw but that's OK because the route name ain't that.
  var routeNames = arguments;

  return _.include(routeNames, Router.current().route.name) && 'active';
});


 Template.friends.helpers({
    friends: [
      { name: "Linda" },
      { name: "Connie" },
      { name: "Tiffany" },
      { name: "Caitlin" },
      { name: "Ara" },
    ]
  });