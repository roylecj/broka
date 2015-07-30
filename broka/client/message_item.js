Template.messageItem.events({
    'click .readItem': function(e) {
       Meteor.call('readItem', this._id);
    },
    'click .referButton': function(e) {

      // We start off with the username and the password that we
      // have used to login.
      // Then we need the patient that we are looking at - so that
      // we can display in patient context.

      var userString = Meteor.user().username;
      var passwordString = Session.get("pwd");
      var patientString = this.patientId;

      var urlString = "http://localhost:4041/?login=" + userString + "&password=" + passwordString + "&patient=" + patientString;

      console.log(urlString);

      Session.set("accessTokenPatient", "");

      var respValue = "";

      // Mark this as read...

      Meteor.call('readItem', this._id);

      respValue = Meteor.call('callViaduct', urlString, function(e, result) {
        console.log("response= " + result);

        Session.set("accessTokenPatient", result);

        // Hide the message window.

        $("#msgModal").modal('hide');

        Router.go('patientReviewPage');

      });
    }
});
