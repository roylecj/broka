Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

Template.home.onCreated(function() {
    Session.set('signedIn', false);
});

Template.home.events({
  'submit form': function(e) {
    e.preventDefault();

    Session.set("fromMedtech", false);
    Session.set("portalPage", true);

    var userId =  $(e.target).find('[name=loginName]').val();
    var password = $(e.target).find('[name=password]').val();

    Meteor.loginWithPassword(userId, password, function(e) {
        console.log("logging in with " + userId);

        console.log(e);

        Session.set('signedIn', true);

        var userString = userId;
        var passwordString = password;

        console.log("user=" + userId + "password=" + passwordString);

//        var urlString = "http://localhost:4041/?login=" + userString + "&password=" + passwordString

        Session.set('pwd', passwordString);

//        console.log(urlString);

        Meteor.call("removeNotifications", userString);

//        debugger

        Session.set("accessToken", "");

/*
        var respValue = "";
        respValue = Meteor.call('callViaduct', urlString, function(e, result) {
          console.log("response= " + result);

          Session.set("accessToken", result);
          Router.go('brokaPage');
        });
*/
        Router.go("brokaPage");

        // if (Session.get("accessToken") !== "") {

        // }
    });
  }
})
