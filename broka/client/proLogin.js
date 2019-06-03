
Template.proLogin.onCreated(function() {
    Session.set('signedIn', false);
    Session.set("loggingIn", false);
});

Template.proLogin.helpers({
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
    loginText: function() {
      if (Session.get("loggingIn")) {
        return "Logging In..."
      } else {
        return "Login"
      }
    }
});

Template.proLogin.events({
  'submit form': function(e) {
    e.preventDefault();

    var userId =  $(e.target).find('[name=loginName]').val();
    var password = $(e.target).find('[name=password]').val();

    var urlString = "http://10.4.0.12:1025/?login=" + userId + "&password=" + password + "&accessType=3";
    var respValue = "";

    Session.set("loggingIn", true);

    respValue = Meteor.call('callViaduct', urlString, function(e, result) {
      if (result === "INVALID") {
          Session.set("errorMessage", "Invalid Credentials - check username / password and role");
      } else {
          var userString = userId;
          var passwordString = password;

          var urlLink = "";

          Session.set("currentUser", userId);

          urlLink = "http://10.4.0.7/ultragendapro/default.asp?newWindow=0&orgLogin=" + userString + "&orgPassword=" + passwordString + "&contextMode=2&marginInPercent=1"
//          urlLink = "http://10.2.0.7/ultragendapro/default.asp?newWindow=0&orgLogin=" + userString + "&orgPassword=" + passwordString + "&contextMode=4&marginInPercent=1"
          Session.set("ugproLink", urlLink);
          Router.go("proPage");
      }
    });
  }
});
