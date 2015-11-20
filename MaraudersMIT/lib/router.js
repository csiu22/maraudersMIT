// Route Manager

Router.route('/', {
    template: 'maraudersMap'
});

Router.route('/checkin');
Router.route('/maraudersMap');
Router.route('/friends');

Router.configure({
    layoutTemplate: 'alwaysPresent'
});