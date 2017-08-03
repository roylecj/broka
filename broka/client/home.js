Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

Template.home.onCreated(function() {
    Session.set('signedIn', false);
});

Template.home.helpers({
    alertMessage: function() {
      if (Session.get("errorMessage")) {
        sAlert.error(Session.get("errorMessage"), alertConfiguration);
        Session.set("errorMessage", "");
      }
    },
    loginButton: function() {
      if (Session.get("loggingIn")) {
        return "disabled"
      } else {
        return "btn-primary"
      }
    },
    loggingInText: function() {
      if (Session.get("loggingIn")) {
        return "Logging In..."
      } else {
        return "Login"
      }
    }
});
Template.home.events({
  'submit form': function(e) {
    e.preventDefault();

    Session.set("loggingIn", true);

    Session.set("fromMedtech", false);
    Session.set("medtechPatient", "");
    Session.set("portalPage", true);

    var userId =  $(e.target).find('[name=loginName]').val();
    var password = $(e.target).find('[name=password]').val();

    var cachedPassword = Session.get("USER_" + userId);
    var cachedUserName = Session.get("DESC_" + userId);
    var cacheIsValid = false;
    var cachedUser = "";
    if (cachedPassword) {
        if (cachedPassword === password) {
          // Happy days as the password is correct and no need to sign in...

          cacheIsValid = true;
          cachedUser = userId;
          cachedPassword = password;
        }
    };

    Session.set("oldMode", false);

    if (Session.get("oldMode")) {
      Meteor.loginWithPassword(userId, password, function(e) {
          console.log("logging in with " + userId);

          console.log(e);

          Session.set('signedIn', true);
          Session.set("loggingIn", false);
          var userString = userId;
          var passwordString = password;

          console.log("user=" + userId + "password=" + passwordString);
          Session.set('pwd', passwordString);

          Meteor.call("removeNotifications", userString);

          Session.set("accessToken", "");

          Router.go("brokaPage");
      });
    } else {

      if (!cacheIsValid) {
      var urlString = "http://10.1.1.63:1025/?login=" + userId + "&password=" + password + "&accessType=4";
      var respValue = "";

      respValue = Meteor.call('callViaduct', urlString, function(e, result) {
        console.log("response= " + result);

        if (result === "INVALID") {
          Session.set("errorMessage", "Invalid Credentials - check username / password and role");
          console.log(result);
          Session.set("loggingIn", false);
        } else {
          Session.set("loggingIn", false);
          // PErson Name is Dennis Armstrong...
          Session.set("personName", result);

          Session.set('signedIn', true);
          var userString = userId;
          var passwordString = password;

          console.log("user=" + userId + "password=" + passwordString);
          Session.set("userName", userString);
          Session.set('pwd', passwordString);

          Session.set("USER_" + userString, passwordString);
          Session.set("DESC_" + userString, result);

          Meteor.call("removeNotifications", userString);

          Session.set("accessToken", "");

          Router.go("brokaPage");
        }

    });
  } else {

    // If the user is cached then we can progress through here...

        Session.set("loggingIn", false);
        Session.set("personName", cachedUserName);
        Session.set('signedIn', true);
        Session.set("userName", cachedUser);
        Session.set('pwd', cachedPassword);
        Meteor.call("removeNotifications", cachedUser);
        Session.set("accessToken", "");
        Router.go("brokaPage");

  }
    }
  }
})
