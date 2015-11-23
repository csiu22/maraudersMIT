// Route Manager

Router.route('/', function() {
	if(Meteor.userId()) {
		// template: 'maraudersMap'
		this.render('maraudersMap'); 
	} else {
		this.render('login');
	}
});

Router.route('/login'); // Useful for debugging but don't include this in final version.
Router.route('/newuser');
Router.route('/checkIn');
Router.route('/maraudersMap');
Router.route('/friends');

Router.configure({
    layoutTemplate: 'alwaysPresent'
});