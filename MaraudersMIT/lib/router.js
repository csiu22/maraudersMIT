// Route Manager

loginroutes =  ["login", "newuser"];

//Global before hooks
Router.onBeforeAction(function () {
    if (!Meteor.user() && !Meteor.loggingIn()) { this.redirect("login"); this.next();} 
    else if (Meteor.user() && !Meteor.user().isVerified) { this.redirect("newuser"); this.next();}           
    else {this.next();}

}, {except: loginroutes});

//Route logged in users to the actual app instead of stopping them at login pages

Router.onBeforeAction(function (){
    if(Meteor.user() && Meteor.user().isVerified){
        this.redirect("maraudersMap");
        this.next();
    }
    else{
        this.next();
    }

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
        layoutTemplate: 'mainTemplate',
 });

Router.route('maraudersMap', {
        path: '/',
        template: 'maraudersMap',
        layoutTemplate: 'mainTemplate',
 });

Router.route('friends', {
        path: '/friends',
        template: 'friends',
        layoutTemplate: 'mainTemplate'
  });

