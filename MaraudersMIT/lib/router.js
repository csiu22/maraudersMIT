// Route Manager

Router.route('/', {
    template: 'maraudersMap'
});

Router.route('/checkIn');
Router.route('/maraudersMap');
Router.route('/friends');

Router.configure({
    layoutTemplate: 'alwaysPresent'
});