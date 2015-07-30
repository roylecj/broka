Template.documentList.helpers({
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
