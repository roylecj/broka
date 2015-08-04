Template.rfaLauncher.events({
  'submit form': function(e) {

    var userId =  $(e.target).find('[name=loginName]').val();
    var password = $(e.target).find('[name=password]').val();

// OK - now we need to get all of the session variables that we have had passed in...

    var practiceId = Session.get("practiceId");
    var patientId = Session.get("patientId");
    var patientSurname = Session.get("patientSurname");
    var patientGiven = Session.get("patientGiven");
    var patientSex = Session.get("patientSex");
    var patientDOB = Session.get("patientDOB");
    var patientMedicare = Session.get("patientMedicare");

// Login to Meteor, and then login to get an access token, and register the patient.

    Meteor.loginWithPassword(userId, password, function(e) {
        console.log("logging in with " + userId);

        console.log(e);

        var userString = userId;
        var passwordString = password;

        Session.set('pwd', passwordString);

        Session.set("accessTokenRFA", "");

        var urlString = "http://localhost:4060/?login=" + userString + "&password=" + passwordString + "&practice=" + practiceId + "&patient=" + patientId + "&surname=" + patientSurname + "&given=" + patientGiven + "&sex=" + patientSex + "&dob=" + patientDOB + "&medicare=" + patientMedicare;

        Meteor.call('callViaduct', urlString, function (e, result) {
          // OK, now we have the token response we

          Session.set("accessTokenRFA", result);
        });
    });

    // Now we are logged in...

    Router.go("rfaPage");

  }
});
