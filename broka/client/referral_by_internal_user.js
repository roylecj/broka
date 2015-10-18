Template.referralByInternalUser.onCreated(function() {
  Session.setDefault("practiceSet", false);
  Session.setDefault("loggingInUser", "");
});

Template.referralByInternalUser.helpers({
  practiceSet: function() {
    return Session.get("practiceSet");
  },
  practices: function() {
    console.log("practices being populated for " + Session.get("loggingInUser"));
    console.log(Practices.find({userId: Session.get("loggingInUser")}).count());
    return Practices.find({userId: Session.get("loggingInUser")}).fetch();
  }});

Template.referralByInternalUser.events({
  "submit form": function(e, template) {

    e.preventDefault();

    if (Session.get("practiceSet")) {
        console.log("submitting");

        Session.set("fromMedtech", false);
        Session.set("portalPage", true);

        var userId =  $(e.target).find('[name=loginName]').val();
        var password = $(e.target).find('[name=password]').val();

        // Session.set('pwd', password);

        Meteor.loginWithPassword(userId, password, function(e) {
            console.log("logging in with " + userId);

            console.log(e);

            Session.set('signedIn', true);

            var userString = userId;
            var passwordString = password;

            console.log("user=" + userId + "password=" + passwordString);

            Session.set('pwd', passwordString);

            Session.set("accessToken", "");

            Router.go("brokaPage");
        });
    } else {
      var userId =  $(e.target).find('[name=loginName]').val();

      console.log('Setting logged in user' + userId);

      Session.set("loggingInUser", userId);

      Session.set("practiceSet", true);
    }
  }
});
