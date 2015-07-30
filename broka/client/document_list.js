Template.documentList.onRendered(function() {
  Session.set("thisPatient", false);
});

Template.documentList.helpers({
  webpasPatient: function() {

    if (!Session.get("thisPatient")) {
      var urlString = "http://localhost:4050/?" + this.patientId

      console.log("urlString=" + urlString);

      var respValue = "";
      respValue = Meteor.call('callViaduct', urlString, function(e, result) {
        console.log("response= " + result);

        Session.set("webpasPatient", result);
      });

      Session.set("thisPatient", true);
    };

    if (Session.get("webpasPatient") === "FOUND") {
      return true;
    } else {
      return false;
    }
  },
  notpasPatient: function() {
    if (Session.get("webpasPatient") === "NOTFOUND") {
      return true;
    } else {
      return false;
    }
  },
  thisPatient: function() {
    return Session.get("thisPatient");
  },
  uploads: function() {
    return Uploads.find( {patientId: this.patientId}, {sort: {createdAt:-1}} );
  },
  patid: function() {
    return this.patientId;
  },
  patidPadded: function() {
     var myPatientId = "";

     myPatientId = "+++" + this.patientId;
     myPatientId = myPatientId.substr(myPatientId.length - 8, myPatientId.length);

     return myPatientId;
  },
  countDocs: function() {
    return Uploads.find( {patientId: this.patientId}).count();
  },
  notTempPatient: function() {
    if(this.patientId.substr(0,2) == "T-") {
      // This is a temporary patient, so we cant display in webPAS
      return false;
    } else {
      return true;
    }
  }
});
