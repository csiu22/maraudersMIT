Handlebars.registerHelper('activePage', function() {
  // includes Spacebars.kw but that's OK because the route name ain't that.
  var routeNames = arguments;

  return _.include(routeNames, Router.current().route.name) && 'active';
});


Handlebars.registerHelper('ifRouteIs', function (routeName) {
      return Router.current().route._path === "/" + routeName;
});

Handlebars.registerHelper('redirect_main', function (routeName) {
      Router.go('maraudersMap');
      renderMap();
});


//TODO: Get Facebook and Marauder's friends using Mongo.
Handlebars.registerHelper('getMyFacebookFriends', function() {
  var friends = [
      { name: "Linda" },
      { name: "Connie" },
      { name: "Tiffany" },
      { name: "Caitlin" },
      { name: "Ara" },
      { name: "Moony" },
      { name: "Wormtail" },
      { name: "Padfoot" },
      { name: "Prongs"}
    ]
    
     return friends
});

// For the MVP (and maybe for the final -- need to discuss), a user's Marauder Friends
// is a subset of their Facebook friends because
// 1) We do not currently have another way to get other users
// 2) Why would a user want to be Marauder's friends if they're not Facebook Friends? (discuss)
Handlebars.registerHelper('getMyMarauderFriends', function() {
  var friends = [
      { name: "Linda" },
      { name: "Connie" },
      { name: "Moony" },
      { name: "Wormtail" },
      { name: "Padfoot" },
      { name: "Prongs"}
    ]
    
     return friends
});