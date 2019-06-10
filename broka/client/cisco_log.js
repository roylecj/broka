Template.ciscoLog.onCreated(function() {
    this.patientId = new ReactiveVar("");
    this.patientName = new ReactiveVar("");
    this.appointmentId = new ReactiveVar("");
    this.appointmentType = new ReactiveVar("");
});

Template.ciscoLog.helpers({
    patientId: function() {
        return Template.instance().patientId.get();
    },
    patientName: function() {
        return Template.instance().patientName.get();
    },
    appointmentId: function() {
        return Template.instance().appointmentId.get();
    },
    appointmentType: function() {
        return Template.instance().appointmentType.get();
    }
});
Template.ciscoLog.events({
    'click .btnDelete': function(e, t) {

        debugger

        thisId = t.appointmentId.get();

        Meteor.call("callViaduct", "http://10.4.0.17:4600/?" + thisId, function(e2, r2) {
            if (!e2) {
//                sAlert.success("Deleted");
                console.log("Delete");
            } else {
 //               sAlert.error("Error deleting record - " + e2)
                console.log("Error - " + e2);
            }

        });

        
    },
   'click .btnCheck': function(e, t) {
       e.preventDefault();
    urlString = "http://10.4.0.17:4100/?admin";
    respValue = "";

    respValue = Meteor.call('callViaduct', urlString, function(e1, result) {
      var patientId;
      var patientName;
      var appointmentId;
      var appointmentType;
      var jsonResult = JSON.parse(result);

      if (jsonResult) {

        if (jsonResult.patientId) {
          patientId = jsonResult.patientId;
          patientName = jsonResult.patientSurname + ", " + jsonResult.patientGiven;
          appointmentId = jsonResult.appointmentId;
          appointmentType = jsonResult.appointmentType;

          t.patientId.set(patientId);
          t.patientName.set(patientName);
          t.appointmentId.set(appointmentId);
          t.appointmentType.set(appointmentType);    
        } else {
            t.patientId.set("");
            t.patientName.set("");
            t.appointmentId.set("");
            t.appointmentType.set("");    
  
        }
      } else {
        t.patientId.set("");
        t.patientName.set("");
        t.appointmentId.set("");
        t.appointmentType.set("");    
    }
    }); 


   } 
})