Template.brokaPage.onRendered(function() {
  console.log("inside BrokaPageURL");

  var userString = "";

  if (Session.get("oldMode")) {
    userString = Meteor.user().username;
  } else {
    userString = Session.get("userName");
  }
  var passwordString = Session.get("pwd");

  var patientString = Session.get("medtechPatient");

  if (patientString === "") {
  var urlString = "http://localhost:4041/?login=" + userString + "&password=" + passwordString
  } else {
    var urlString = "http://localhost:4041/?login=" + userString + "&password=" + passwordString + "&patient=" + patientString;
  }
  console.log("urlString=" + urlString);

  var respValue = "";
  respValue = Meteor.call('callViaduct', urlString, function(e, result) {
    console.log("response= " + result);

    Session.set("accessToken", result);
    if (Session.get("accessToken")) {

      console.log("accessToken is found");

//      var urlString = "https://schedulingdemo.healthhost.net/ultragendabroka/referrer/default.aspx?accesstoken=" + Session.get("accessToken");

      console.log("urlString=" + urlString);

    } else {

      console.log("accesstoken not found!!!");

    };

  });

});

Template.brokaPage.helpers({
    brokaPageURL: function() {
      // Need to call the broka service to get an access token first... and then
      var urlString = "https://schedulingdemo.healthhost.net/ultragendabroka/referrer/default.aspx?accesstoken=" + Session.get("accessToken");

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
