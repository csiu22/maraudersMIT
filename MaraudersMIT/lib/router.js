// Route Manager

Router.route('/', function() {
		this.render('login');
});

Router.route('/login'); 
Router.route('/newuser');

Router.route('checkIn', {
        path: '/checkIn',
        template: 'checkIn',
        layoutTemplate: 'alwaysPresent'
 });


Router.route('maraudersMap', {
        path: '/maraudersMap',
        template: 'maraudersMap',
        layoutTemplate: 'alwaysPresent'
 });

Router.route('friends', {
        path: '/friends',
        template: 'friends',
        layoutTemplate: 'alwaysPresent'
  });

/*
Router.configure({
    layoutTemplate: 'alwaysPresent'
});
*/