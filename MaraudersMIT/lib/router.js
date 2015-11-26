// Route Manager

loginroutes =  ["login", "newuser"];

//Global before hooks
Router.onBeforeAction(function () {
    if (Meteor.userId() == null) { this.render("login"); } 
    else if (!Meteor.user().isVerified) { this.render("newuser"); }           
    else {}

        this.next();

}, {except: loginroutes});

//Route logged in users to the actual app instead of stopping them at login pages

Router.onBeforeAction(function (){
    if(Meteor.userId() && Meteor.user().isVerified){
        this.render("maraudersMap");
    }
    this.next();

}, {only: loginroutes });


Router.route('login', {
        path: '/login',
        template: 'login',
    }); 

Router.route('newuser', {
    path: '/register',
    template: 'newuser',
});

Router.route('checkIn', {
        path: '/checkIn',
        template: 'checkIn',
        layoutTemplate: 'alwaysPresent',
 });

Router.route('maraudersMap', {
        path: '/',
        template: 'maraudersMap',
        layoutTemplate: 'alwaysPresent',
 });

Router.route('friends', {
        path: '/friends',
        template: 'friends',
        layoutTemplate: 'alwaysPresent'
  });

