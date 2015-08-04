Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.route('/', {name: 'home'});
Router.route('/broka', {name: 'brokaPage'});
Router.route('/upload/:_id', {
  name: 'upload',
  data: function() {
      return Uploads.findOne({ _id: this.params._id });
  }});

Router.route('/read/:_id', function() {
  Meteor.call('readItem', this.params._id);
}, {where: 'server', name: 'readItem'});

Router.route('/uploadItem/:name', function() {
  var response = this.response;

  var idFromName = Uploads.findOne( {name : this.params.name });

  console.log(idFromName._id);
  var fileNameExt = idFromName.name.split('.').pop();
  console.log(fileNameExt);

  this.response.end(idFromName._id + '.' + fileNameExt);
},  {where: 'server'});

Router.route('/documentList/', {
  name: 'documentList',
  data: function() {
    console.log("patient=" + this.params.query);

    Meteor.call('insertPatient', this.params.query.patientId);
    return PatientList.findOne({patientId: this.params.query.patientId});
  }
});

Router.route('/updateItem/:userId/setPatient/:patientId/department/:dept/doctor/:doctor', function() {
//    Uploads.update({userId: this.params.userId, patientId: {}}, {$set: {patientId: this.params.patientId}});
    Meteor.call('updateByUser', this.params.userId, this.params.patientId, this.params.dept, this.params.doctor);
    Meteor.call('insertNotification', this.params.userId);

//    Session.set('documentsUploaded', true);
    // this.render('updateItem');
    this.response.end('done');
}, {where: 'server'});

Router.route('/referral/:userId/patient/:patientId/id/:seqId/notes/:notes', function() {
    // console.log("referral-" + this.request.body.notes);

    console.log("checking insert for notes");
    Meteor.call('insertReferralStatus', this.params.userId, this.params.patientId, this.params.seqId, this.params.notes);
    this.response.end("DONE");
}, {where: 'server'});

Router.route('/patientReview', {
    name: 'patientReviewPage'
});

// This is for the RFA processing for South Eastern Sydney

Router.route('/rfa/', function() {
    // Now we need to get the other parameters that are passed in as the query...

    var practiceId = "";
    var patientId = "";
    var patientSurname = "";
    var patientGiven = "";
    var patientDOB = "";
    var patientSex = "";
    var patientMedicare = "";

    practiceId = this.params.query.practiceId;
    patientId = this.params.query.patientId;
    patientSurname = this.params.query.surname;
    patientGiven = this.params.query.givenName;
    patientDOB = this.params.query.dob;
    patientSex = this.params.query.sex;
    patientMedicare = this.params.query.medicare;

    // We need to save these as session parameters
    // so that we can login first...

    Session.set("practiceId", practiceId);
    Session.set("patientId", patientId);
    Session.set("patientSurname", patientSurname);
    Session.set("patientGiven", patientGiven);
    Session.set("patientDOB", patientDOB);
    Session.set("patientSex", patientSex);
    Session.set("patientMedicare", patientMedicare);

    // Default in the user and password (FOR THE MOMENT)!!!!

    // var userString = "darm";
    // var passwordString = "darmdarm";

    // OK, so we have all of our parameters now, it is time to call
    // Viaduct and setup the process to create the patient, if they don't
    // already exist...

},{
    name: 'rfaLauncher'
});

Router.route("/rfaPage", {
    name: 'rfaPage'
});
