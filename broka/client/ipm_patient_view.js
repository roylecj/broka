Template.ipmPatientView.onCreated(function() {
  console.log("patient=" + this.data.patientId);

  var urlString = "http://localhost:4042/?" + this.data.patientId;

  respValue = Meteor.call('callViaduct', urlString, function(e, result) {
    var patientDetails = "";

    patientDetails = JSON.stringify(result, {indent: true});

    Session.set("patientDetails", JSON.parse(patientDetails));

  });
});

Template.ipmPatientView.helpers({
  patientSurname: function() {
    var patientDetails;

    patientDetails = Session.get("patientDetails")

    return JSON.parse(patientDetails).surname;
  },
  patientGivenName: function() {
    var patientDetails;

    patientDetails = Session.get("patientDetails")
    return JSON.parse(patientDetails).givenName;
  },
  patientId: function() {
    var patientDetails;

    patientDetails = Session.get("patientDetails")
    return JSON.parse(patientDetails).patientId;
  },
  patientSex: function() {
    var patientDetails;

    patientDetails = Session.get("patientDetails")
    return JSON.parse(patientDetails).sex;
  },
  imageFile: function() {
    var patientDetails;

    patientDetails = Session.get("patientDetails")
    var sex = JSON.parse(patientDetails).sexCode;

    if (sex === "M") {
      return "user_male.png";
    } else {
      return "user_female.png";
    }
  },
  patientDOB: function() {

    var patientDetails;

    patientDetails = Session.get("patientDetails")
    var dob = JSON.parse(patientDetails).dateOfBirth;

    return moment(dob).format("DD MMM YYYY");
    },
  patientAge: function() {
    var patientDetails;

    patientDetails = Session.get("patientDetails")
    var dob = JSON.parse(patientDetails).dateOfBirth;

    return moment(dob).fromNow(true);
  }
});
