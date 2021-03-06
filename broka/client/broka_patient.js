Template.brokaPatient.onRendered(function() {
  Session.setDefault("loggingIn", false);

  this.$('.datepicker').datetimepicker({
                    format: 'DD-MM-YYYY'
                });
});

Template.brokaPatient.helpers({
  loginButton: function() {
    if (Session.get("loggingIn")) {
      return "disabled"
    } else {
      return "btn-primary"
    }
  },
  loggingInText: function() {
    if (Session.get("loggingIn")) {
      return "Logging In..."
    } else {
      return "Login"
    }
  },
  vpnEnabled: function() {
    /*
    if (window.document.URL.startsWith("http://10.4.0.7")) {
      return true
    } else {
      return false
    }*/
    return true
  }
});

Template.brokaPatient.events({
  "submit form": function(e, t){
    e.preventDefault();

debugger

    var patientId =  $(e.target).find('[name=patientId]').val();
    var accessCode = $(e.target).find('[name=accessCode]').val();
    var patientDOB = $(e.target).find('[name=patientDOB]').val();
    var patientSex = $(e.target).find('[name=patientSex]').val();

    // We need to reverse date of birth

    var patientYear = patientDOB.substring(6,10);
    var patientMonth = patientDOB.substring(3,5);
    var patientDay = patientDOB.substring(0,2);

    patientDOB = patientYear + "-" + patientMonth + "-" + patientDay;

    Session.set("medtechPatient", patientId);
    Session.set("userName", accessCode);
    Session.set("dob", patientDOB);
    Session.set("sex", patientSex);
    Session.set("fromMedtech", false);
    Session.set("patientPortal", true);

    Router.go("patientBrokaPage");
  },
  "click .btnSearch": function(e, t) {
    e.preventDefault();

    var patientId =  $(document).find('[name=patientId]').val();

    console.log("Searching for the patient");
debugger
    Meteor.call("getPatientDetails", patientId, window.document, function(e, r) {
        if (! e) {
          $(document).find('[name=accessCode]').val(r.accessCode);
          $(document).find('[name=patientDOB]').val(r.patientDOB);
          $(document).find('[name=patientSex]').val(r.patientSex);      
        }
    });
  }
});
