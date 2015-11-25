// Global function redirect
redirect = function(routeName) {
      console.log("redirecting to " + routeName);
      Router.go(routeName);
}

Handlebars.registerHelper('activePage', function() {
  // includes Spacebars.kw but that's OK because the route name ain't that.
  var routeNames = arguments;

  return _.include(routeNames, Router.current().route.name) && 'active';
});

Handlebars.registerHelper('ifRouteIs', function (routeName) {
      return Router.current().route._path === "/" + routeName;
});