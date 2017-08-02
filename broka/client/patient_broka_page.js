Template.patientBrokaPage.onRendered(function() {
  console.log("inside BrokaPageURL");

  var userString = "";

  userString = Session.get("userName");

  var dobString = Session.get("dob");
  var sexString = Session.get("sex");
  var patientString = Session.get("medtechPatient");

  var urlString = "http://10.2.0.8:4044/?passcode=" + userString + "&patient=" + patientString + "&birthdate=" + dobString + "&sex=" + sexString;

  console.log("urlString=" + urlString);

  var respValue = "";
  respValue = Meteor.call('callViaduct', urlString, function(e, result) {
    console.log("response= " + result);

    Session.set("accessToken", result);
    if (Session.get("accessToken")) {

      console.log("accessToken is found");

      console.log("urlString=" + urlString);

    } else {

      console.log("accesstoken not found!!!");

    };

  });

});

Template.patientBrokaPage.helpers({
    brokaPageURL: function() {
      // Need to call the broka service to get an access token first... and then
      var urlString = "http://10.2.0.7/ultragendabroka/patient/default.aspx?accesstoken=" + Session.get("accessToken");

      return urlString;
    },
    isAccessToken: function() {
      if (Session.get("accessToken")) {
        return true;
      } else {
        return false;
      }
    }
});
