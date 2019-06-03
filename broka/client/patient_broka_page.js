Template.patientBrokaPage.onRendered(function() {
  console.log("brokaOn Rendered");

  var userString = "";

  userString = Session.get("userName");

  var dobString = Session.get("dob");
  var sexString = Session.get("sex");
  var patientString = Session.get("medtechPatient");

  var urlString = "http://10.4.0.12:4044/?passcode=" + userString + "&patient=" + patientString + "&birthdate=" + dobString + "&sex=" + sexString;

  console.log("1 - getting passcode=" + urlString);

  var respValue = "";
  respValue = Meteor.call('callViaduct', urlString, function(e, result) {
    console.log("2. TOKEN-response= " + result);

    Session.set("accessToken", result);
    if (Session.get("accessToken")) {

      console.log("accessToken is found");

      console.log("urlString=" + urlString);

    } else {

      console.log("accesstoken not found!!!");

    };

  });

  console.log("3. Getting appointment id");

  // Getting the room for the next appointment id - for this particular patient...
  Meteor.call("callViaduct", "http://10.4.0.17:3800/?" + patientString, function(e, r) {
      console.log("4. response from viaduct -" + r);
      var responseBack = JSON.parse(r);

      roomId = responseBack.room_id;
      var apptId = responseBack.appointment_id;
      console.log("5. roomId = " + roomId);

      Session.set("patientSpaceId", roomId);

      Meteor.call("callViaduct", "http://10.4.0.17:3600/?jl8487058", function(e1, r1) {
          var responseBack1 = JSON.parse(r1);
  
          var patientAccessToken = responseBack1.tokenData;

          console.log("6. accessToken = " + patientAccessToken);
      
          Session.set("patientAccessToken", patientAccessToken);
      });

      // We need to update the status to arrived.

      var thisId = apptId + '|1';

      if (apptId) {
        Meteor.call("postViaduct", "http://10.4.0.12:3500/", thisId, function(e2, r2) {
          // updating to arrived.
          console.log("7. Logging update to arrival of appointment " + thisId);
        });
        Meteor.call("callViaduct", "http://10.4.0.17:3950/?" + apptId, function(e2, r2) {
          console.log("8. updating arrival so clinician sees")
        });
      }
    });
});

Template.patientBrokaPage.helpers({
    brokaPageURL: function() {
      // Need to call the broka service to get an access token first... and then

      var urlString;

      if (window.document.URL.startsWith("http://10.4.0.7")) {
        urlString = "http://10.4.0.7/ultragendabroka/patient/default.aspx?accesstoken=" + Session.get("accessToken");
      } else {
        urlString = "http://52.255.45.28/ultragendabroka/patient/default.aspx?accesstoken=" + Session.get("accessToken");
      }

      return urlString;
    },
    pageURL: function() {
      var urlString;

      if (window.document.URL.startsWith("http://10.4.0.7")) {
        urlString = "10.4.0.7";
      } else {
        urlString = "52.255.45.28";
      }

      return urlString;
    },
    isAccessToken: function() {
      if (Session.get("accessToken")) {
        return true;
      } else {
        return false;
      }
    },
    telehealthAppointment: function() {
      if (Session.get("telehealthAppointment")) {
        return true
      } else {
        return false
      }
    },
    accessToken: function() {
      return Session.get("patientAccessToken");
    },
    spaceId: function() {
      return Session.get("patientSpaceId");
    }
});
