Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [
      Meteor.subscribe('userSettings')
    ];
  }
});

Router.route('/', {name: 'home', layoutTemplate: 'layoutNew'});
Router.route('/broka', {name: 'brokaPage'});
Router.route('/brokaNew', {name: 'homeNew', layoutTemplate: 'layoutNew'});
Router.route('/patientPortalPage', {name: 'patientBrokaPage'});
Router.route('/brokaPatient', {name: 'brokaPatient', layoutTemplate: 'layoutNew'});
Router.route('/pro', {name: 'proPage', layoutTemplate: 'layoutPro'});
Router.route('/proLogin', {name: 'proLogin', layoutTemplate: 'layoutNew'});
Router.route('/settings', {name: 'settings'});

Router.route('/upload/:_id', {
  name: 'upload',
  data: function() {
      return Uploads.findOne({ _id: this.params._id });
  }});

Router.route('/read/:_id', function() {
  Meteor.call('readItem', this.params._id);
}, {where: 'server', name: 'readItem'});

Router.route('/patientOnlyPortal/:patientId', function() {
console.log("ENDPOINT=patientOnlyPortal");
  Session.set("userName", "dclark");
  Session.set("pwd", "dclark");
  Session.set("medtechPatient", "245728");

// userString = "ASHINE";
// passwordString = "MEDTECH123";
// patientString="100037";
  Session.set("brokaSite", "10.4.0.7");
  Router.go('brokaPage');
  this.response.end("HERE");
  this.next();
}, {name: 'patientOnlyPortalAccess'});

Router.route('/ipmLaunch', function() {
  //var redirectUrl = 'PimsContextSwitch:-D:IPMAU,U:pims,P:pims32,PASID:0000034'; // + this.params.query.patientId;
var redirectUrl = "pimscontextswitch:-D:IPMAU,U:pims,P:pims32,FACIL:,PASID:" + this.params.query.patientId;
  console.log(redirectUrl);

  this.response.writeHead(302, {
    'Location': redirectUrl
  });

  this.response.end();
}, {name: "tester", where:"server"});

Router.route('/refer', function() {
  var redirectUrl = 'http://10.4.0.7:3000/ereferrals/' + this.params.query.patientId + '.xml';

console.log(redirectUrl);

  this.response.writeHead(302, {
    'Location': redirectUrl
  });

  this.response.end();
}, {name: "refer", where: "server"});
Router.route('/webpas', function() {
  var redirectUrl = "https://webpasdemo.healthhost.net/pas/php/PatientView.php?urnumber=" + this.params.query.patientId;
  var userData = new Buffer('jsnell:js123').toString('base64');

  console.log("user = " + userData);

  this.response.writeHead(302, {
    'Location': redirectUrl,
    'Authorization': 'Basic ' + userData
  });

  this.response.end();

}, {name: "webpas", where: "server"});

Router.route('/mmh', {name: 'mmhPage', layoutTemplate: 'mmhLayout'});
Router.route('/bpac/patient/:patientId/pathway/:pathway/', function() {

  console.log("Inside broka");
// We need to set the portal page flag so that we can add attachments...

    Session.set("brokaSite", "10.4.0.7");
    Session.set("ohcSite", "10.4.0.12");
    Session.set("portalPage", true);
    Session.set("fromMedtech", true);
    Session.set("medtechPatient", this.params.patientId);

    Session.set("BPACpatientId", this.params.patientId);

// As the user is a combination of pathway and the user id...
   var userId = this.params.query.user + this.params.pathway;

// We need to switch to lowercase

   // userId = userId.toLowerCase();

   var password = this.params.query.password;

   console.log("user=" + userId);
   console.log("password=" + password);

//   Meteor.loginWithPassword(userId, password, function(e) {
       console.log("logging in with " + userId);

//       console.log(e);

       Session.set('signedIn', true);

       var userString = userId;
       var passwordString = password;

       console.log("user=" + userId + "password=" + passwordString);
       console.log("userName setting set to " + userId);
       Session.set("userName", userId);
       Session.set('pwd', passwordString);

//       Meteor.call("removeNotifications", userString);

       Session.set("accessToken", "");
       Session.set("isBPAC", true);
       Router.go("brokaPage");
//     });

   console.log("in broka");
 }, {
   name: 'bpacNavigator'
 }
);

Router.route('/patientPortalNOTUSED/:patientId', function() {
  console.log("ENDPOINT=patientPortal");
  Session.set("userName", "dclark");
  Session.set("pwd", "dclark");
  Session.set("medtechPatient", "245728");

// userString = "ASHINE";
// passwordString = "MEDTECH123";
// patientString="100037";
Session.set("brokaSite", "10.4.0.7");
Session.set("ohcSite", "10.4.0.12");
  Router.go('brokaPage');
  this.response.end("HERE");
  this.next();
}, {name: 'patientPortalAccessOLD'});

Router.route('/ciscoLog', {name: "ciscoLog"});

Router.route('/patientPortal/:patientId', function() {
  console.log("CORRECT");
  console.log("ENDPOINT=patientPortalNOTUSED");
  Session.set("userName", "79AL AAF8");
  Session.set("dob", "1951-09-01");
  Session.set("sex", "M");
  Session.set("medtechPatient", "CSC0000703");

// userString = "ASHINE";
// passwordString = "MEDTECH123";
// patientString="100037";
Session.set("brokaSite", "10.4.0.7");
Session.set("ohcSite", "10.4.0.12");

console.log("routing to patientBrokaPage");

  Router.go('patientBrokaPage');
  this.response.end("HERE");
  this.next();
}, {name: 'patientPortalAccess'});

Router.route("/telehealthVC/:appointmentId", function() {
  var isComplete = false;

  var thisId = this.params.appointmentId + '|1';

  Meteor.call("postViaduct", "http://10.4.0.12:3500/", thisId, function(e, r) {
      console.log("Completed");
      isComplete = true;
  });

});

Router.route('/authorised', {name: 'authorised'});

Router.route('/authoriseMe', function() {
  var userId = Meteor.users().username;

  console.log("user = " + userId);

  var redirectUrl = "https://api.ciscospark.com/v1/authorize?client_id=Cd3edecb1da36640d1cb5023aa149dec07137e2a57f1ec96b76564f08ba897f99&response_type=code&redirect_uri=http%3A%2F%2F52.255.45.28%3A3000%2Fauthenticate&scope=spark%3Aall%20spark%3Akms&state=" + userId;

  this.response.writeHead(302, {
    'Location': redirectUrl
  });

  this.response.end();
}, {name: 'authoriseMe', where: 'server' });

Router.route("/authenticate", function() {

  // Ok, so we get the authorization code, and then we can call viaduct to update the cache with the 
  // token...

  var authCode = this.params.query.code;
  var redirectUrl = "";
  var isComplete = false;

  console.log("Adding auth code of " + authCode);

  Meteor.call("postViaduct", "http://10.4.0.17:3500/", authCode, function(e, r) {
      console.log("Posting to viaduct >>> ");
      console.log("                      Authorization Code = " + authCode);
      console.log("                   <<< ")
  });

  // So, we are complete, then lets redirect to the right page.

  Router.go("authorised");
},{name: "authenticate"});

Router.route('/telehealth/:appointmentId', function() {
  // This launches the telehealth visit for the patient

  // First set the stage marker for this appointment

  // Now launch the web site.

  // Here is the SKYPE version
 // var redirectUrl = "https://meet.lync.com/cscportal/croyle3/RVC11C2R?s1=1";
//  var userData = new Buffer('jsnell:js123').toString('base64');

  var redirectUrl = "http://52.255.45.28/cisco_patient.html";
  var isComplete = false;

  var thisId = this.params.appointmentId + '|1';

  Meteor.call("postViaduct", "http://10.4.0.12:3500/", thisId, function(e, r) {
      console.log("Completed");
      isComplete = true;
  });
/*
  while(! isComplete) {
    console.log("waiting");
    // waiting
  }
  */
//  console.log("user = " + userData);

/*
  this.response.writeHead(302, {
    'Location': redirectUrl,
    'Authorization': 'Basic ' + userData
  });
*/

  console.log("redirecting");

  this.response.writeHead(302, {
    'Location': redirectUrl
  });

  this.response.end();

}, {name: "telehealth", where: "server"});

Router.route('/telehealthPatient', function() {
  // This launches the telehealth visit for the patient

  var thisId = this.params.query.patientId;
  var accessToken;
  var roomId;
  var isComplete = false;

  console.log("thisId= " + thisId);

  // Getting the room for the next appointment id - for this particular patient...
  Meteor.call("callViaduct", "http://10.4.0.17:3800/?" + thisId, function(e, r) {
      console.log("response from viaduct -" + r);
      var responseBack = JSON.parse(r);

      roomId = responseBack.room_id;
      isComplete = true;
  });

  // Wait until it is complete

  while(isComplete === false) {
    // Do nothing...
  }

  isComplete = false;

  // Looking up a token for this patient...

  Meteor.call("callViaduct", "http://10.4.0.17:3600/?jl8487508", function(e, r) {
      var responseBack = JSON.parse(r);

      accessToken = responseBack.tokenData;
      isComplete = true;
  });

  while(isComplete === false) {
    // Do nothing...
  }

  // We are redirecting the patient to the correct URL based upon their token and room.
  var redirectUrl = "http://52.255.45.28/cisco_launch.html?accessToken=" + accessToken + "&spaceId=" + roomId;

  this.response.writeHead(302, {
    'Location': redirectUrl
  });

  this.response.end();

}, {name: "telehealthPatient", where: "server"});

Router.route('/telehealthLaunch', function() {
  // This launches the telehealth visit for the Clinician

//  var redirectUrl = "https://meet.lync.com/cscportal/croyle3/RVC11C2R";

  var thisId = this.params.query.appointmentId;
  var accessToken;
  var roomId;
  var isComplete = false;

  console.log("thisId= " + thisId);

  Meteor.call("callViaduct", "http://10.4.0.17:3700/?" + thisId, function(e, r) {

      console.log("response from viaduct -" + r);
      var responseBack = JSON.parse(r);

      roomId = responseBack.room_id;
      isComplete = true;
  });

  // Wait until it is complete

  while(isComplete === false) {
    // Do nothing...
  }

    isComplete = false;

  Meteor.call("callViaduct", "http://10.4.0.17:3600/?admin", function(e, r) {
      var responseBack = JSON.parse(r);

      accessToken = responseBack.tokenData;
      isComplete = true;
  });

  while(isComplete === false) {
    // Do nothing...
  }

  var redirectUrl = "http://52.255.45.28/cisco_launch.html?accessToken=" + accessToken + "&spaceId=" + roomId;

  this.response.writeHead(302, {
    'Location': redirectUrl
  });

  this.response.end();

}, {name: "telehealthLaunch", where: "server"});

Router.route('/patientPortalNOTUSEDOLD/:patientId', function() {
  console.log("CORRECT");
  console.log("ENDPOINT=patientPortal");
  Session.set("userName", "58AZ 3HHJ");
  Session.set("dob", "1945-01-04");
  Session.set("sex", "F");
  Session.set("medtechPatient", "100037");

// userString = "ASHINE";
// passwordString = "MEDTECH123";
// patientString="100037";
Session.set("brokaSite", "10.4.0.7");
Session.set("ohcSite", "10.4.0.12");
  Router.go('patientBrokaPage');
  this.response.end("HERE");
  this.next();
}, {name: 'patientPortalAccess3'});

Router.route('/uploadItem/:name', function() {
  var response = this.response;

//  var idFromName = Uploads.findOne( {name : this.params.name });

//  var idFromName = Uploads.find( {name: this.params.name}, {createdAt: -1}).limit(1);
  var idFromName = Uploads.findOne( { $query: {name: this.params.name}, $orderby: { createdAt : -1 } } );

  console.log(idFromName._id);
  var fileNameExt = idFromName.name.split('.').pop();
  console.log(fileNameExt);

  this.response.end(idFromName._id + '.' + fileNameExt);
},  {name: 'uploadItemRec', where: 'server'});

Router.route('/documentList/', {
  name: 'documentList',
  data: function() {
    console.log("patient=" + this.params.query);

// Meteor.call('removeDocs', this.params.query.patientId);

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
}, {name: 'updateItemEntry', where: 'server'});

Router.route('/referral/:userId/patient/:patientId/id/:seqId/notes/:notes', function() {
    // console.log("referral-" + this.request.body.notes);

    console.log("checking insert for notes");
    Meteor.call('insertReferralStatus', this.params.userId, this.params.patientId, this.params.seqId, this.params.notes);
    this.response.end("DONE");
}, {name: 'erefer', where: 'server'});

Router.route('/internal', {
    name: 'referralByInternalUser'
});

Router.route('/patientReview', {
    name: 'patientReviewPage'
});

Router.route('/UltraGendaBroka/patient/:patientId/pathway/:pathway/', function() {

console.log("Inside broka");
// We need to set the portal page flag so that we can add attachments...

    Session.set("portalPage", true);
    Session.set("fromMedtech", true);
    Session.set("medtechPatient", this.params.patientId);

// As the user is a combination of pathway and the user id...
   var userId = this.params.query.user + this.params.pathway;

// We need to switch to lowercase

   userId = userId.toLowerCase();

   var password = this.params.query.password;

   console.log("user=" + userId);
   console.log("password=" + password);

   Meteor.loginWithPassword(userId, password, function(e) {
       console.log("logging in with " + userId);

       console.log(e);

       Session.set('signedIn', true);

       var userString = userId;
       var passwordString = password;

       console.log("user=" + userId + "password=" + passwordString);

       Session.set('pwd', passwordString);

       Meteor.call("removeNotifications", userString);

       Session.set("accessToken", "");

Session.set("brokaSite", "10.4.0.7");
Session.set("ohcSite", "10.4.0.12");
       Router.go("brokaPage");
     });

   console.log("in broka");
 }, {
   name: 'pathwayNavigator'
 }
);

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

Router.route("/obs", {
    name: "observationSample"
});

Router.route("/hw", {
    name: "heightWeight"
})
