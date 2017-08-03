Template.brokaPage.onRendered(function() {
  console.log("inside BrokaPageURL");

  var userString = "";

  if (Session.get("oldMode")) {
    console.log("OLD MODE");
    userString = Meteor.user().username;
  } else {
    console.log("NEW MODE");
    userString = Session.get("userName");
  }
  var passwordString = Session.get("pwd");

  var patientString = Session.get("medtechPatient");

// userString = "ASHINE";
// passwordString = "MEDTECH123";
// patientString="100037";

  var ohcSite = "";

  // Session.get("ohcSite");

  if (!ohcSite) {
    ohcSite = "10.1.1.63";
  };

console.log("username string is " + userString);

  if (patientString === "") {
  var urlString = "http://" + ohcSite + ":4041/?login=" + userString + "&password=" + passwordString
  } else {
    var urlString = "http://" + ohcSite + ":4041/?login=" + userString + "&password=" + passwordString + "&patient=" + patientString;
  }
  console.log("OHC urlString=" + urlString);

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

Template.brokaPage.helpers({
    brokaPageURL: function() {
      // Need to call the broka service to get an access token first... and then
      var brokaSite = "";

      brokaSite = Session.get("brokaSite");

      if (!brokaSite) {
        brokaSite = "schedulingdemo.healthhost.net";
      }
      var urlString = "https://schedulingdemo.healthhost.net/ultragendabroka/referrer/default.aspx?accesstoken=" + Session.get("accessToken");

      console.log("url=" + urlString);

      return urlString;
    },
    isBPAC: function() {
      if (Session.get("showPatients")) {
        return true
      } else {
        return false
      }
    },
    isAccessToken: function() {
      if (Session.get("accessToken")) {
        return true;
      } else {
        return false;
      }

    }
});
