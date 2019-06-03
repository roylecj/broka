Template.headerPro.onCreated(function() {
    Session.setDefault("gpCode", "");
    Session.setDefault("showFavorites", "");
    Session.setDefault("ciscoToken", "");
    Session.setDefault("hasCiscoToken", false);
    Session.setDefault("checkStatus", true);
    Session.setDefault("patientArrived", "");
    Meteor.setInterval(function() {
      Session.set("checkStatus", true);
    }, 5000);
  
});

Template.headerPro.helpers({
    currentUserEntered: function() {
       if (Session.get("signedIn")) {
         return true
       } else {
         return false
       }
    },
    patientId: function() {
      if (Session.get("BPACpatientId")){
        return Session.get("BPACpatientId")
      }
    },
    isBPAC: function() {
      if (Session.get("isBPAC")) {
        return true
      } else {
        return false
      }
    },
    starState: function() {
      if (Session.get("showFavorites")) {
        return "glyphicon glyphicon-star"
      } else {
        return "glyphicon glyphicon-star-empty"
      }
    },
    currentUserName: function() {
      // return Meteor.user().username;

      if (Session.get("oldMode")) {
        if (Meteor.user().profile.name) {
          return Meteor.user().profile.name;
        } else {
          return Meteor.user().username;
        }
      } else {
        return Session.get("personName");
      }
    },
    signedIn: function() {
      return Session.get('signedIn');
    },
    uploads: function() {
      return Uploads.find( {
        patientId: null
      });
    },
    uploadCount: function() {
      return Uploads.find( {
        patientId: null
       }).count();
    },
    specificFormData: function() {

      if (Session.get("oldMode")){
        return {
          userId: Meteor.user.userName
          }
      } else {
        return {
          userId: Session.get("userName")
        }
      }
    },
    notificationCount: function() {
      var countNotifications = 0;
      if (Session.get("oldMode")) {
        countNotifications = Notifications.find( {userId: Meteor.user().username} ).count();
      } else {
        countNotifications = Notifications.find( {userId: Session.get("userName")} ).count();
      }
      return countNotifications;
    },
    statusUpdateCount: function() {
       if (Session.get("oldMode")) {
         return ReferralStatus.find( {userId: Meteor.user().username, readFlag: false}).count();
       } else {
         return ReferralStatus.find( {userId: Session.get("userName"), readFlag: false}).count();
       }
    },
    messageText: function() {

       var cnt = 0;

       if (Session.get("oldMode")) {
         cnt = ReferralStatus.find( {userId: Meteor.user().username, readFlag: false}).count();
       } else {
         cnt = ReferralStatus.find( {userId: Session.get("userName"), readFlag: false}).count();
       }
        if (cnt == 1) {
          return cnt + " message";
        } else {
          return cnt + " messages";
        }
    },
    isPortal: function() {
      if (Session.get("portalPage")) {
        return true;
      } else {
        return false;
      }
    },
    isPatientPortal: function() {
      if (Session.get("patientPortal")) {
        return true
      } else {
        return false
      }
    },
    messages: function() {
      if (Session.get("oldMode")) {
        return ReferralStatus.find( {userId: Meteor.user().username, readFlag: false});
      } else {
        return ReferralStatus.find( {userId: Session.get("oldMode"), readFlag: false});

      }
    },
    notMedtech: function() {
      return !Session.get("fromMedtech");
    },
    isInternalUser: function() {
      return true;
    },
    GP: function() {
      console.log("filtering gps to " + Session.get("gpFilter"));
      GPS.find({gpName: {$regex: Session.get("gpFilter"), $options: 'i'}}).fetch();
    },
    practiceItems: function() {
      return Practices.find({gpCode: Session.get("gpCode")}).fetch();
    },
    gpPopulated: function() {
      if (Session.get("gpCode")) {
        return true;
      } else {
        return false;
      }
    },
    checkCiscoStatus: function() {
      if (Session.get("checkStatus") === true) {
        var userId = Session.get("currentUser");

        var urlString = "http://10.4.0.17:3600/?" + userId;
        var respValue = "";
        
        console.log("checkCiscoStatus for " + userId);
        console.log("urlString = " + urlString);

        respValue = Meteor.call('callViaduct', urlString, function(e, result) {
          var tokenResult = JSON.parse(result);

          console.log(tokenResult);

          if (tokenResult.tokenData) {
            Session.set("ciscoToken", tokenResult);
            Session.set("hasCiscoToken", true);  
          } else 
          {
            Session.set("ciscoToken", "");
            Session.set("hasCiscoToken", false);
          }
        }); 

        urlString = "http://10.4.0.17:4100/?" + userId;
        respValue = "";

        respValue = Meteor.call('callViaduct', urlString, function(e, result) {
debugger
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
    
              Session.set("patientArrived", patientId);
              Session.set("patientArrivedName", patientName);
              Session.set("patientArrivedApId", appointmentId);
              Session.set("patientArrivedApType", appointmentType);    
            } else {
              Session.set("patientArrived", "");
              Session.set("patientArrivedName", "");
              Session.set("patientArrivedApId", "");
              Session.set("patientArrivedApType", "");    
            }
          } else {
            Session.set("patientArrived", "");
            Session.set("patientArrivedName", "");
            Session.set("patientArrivedApId", "");
            Session.set("patientArrivedApType", "");  
          }
        }); 

        Session.set("checkStatus", false);
      }
    },
    patientArrived: function() {
      return Session.get("patientArrived");
    },
    patientArrivedName: function() {
      return Session.get("patientArrivedName");
    },
    patientArrivedApId: function() {
      return Session.get("patientArrivedApId");
    },
    patientArrivedApType: function() {
      return Session.get("patientArrivedApType");
    },
    hasPatientArrived: function() {
      if (Session.get("patientArrived") === "") {
        return false
      } else {
        return true
      }
    },
    ciscoLoggedIn: function() {
      console.log("Checking cisco login");

      return Session.get("hasCiscoToken");
    },
    userId: function() {
      return Session.get("currentUser");
    },
    acGPSettings: function() {
   return {
     position: "bottom",
     limit: 5,
     rules: [
       {
         collection: GPS,
         field: "gpName",
         options: 'i',
         matchAll: true,
         template: Template.gpItem
       }
     ]
   };
 }
 });

 Template.headerPro.events({
    'click .buttonLogout': function(e) {

      Session.set("gpCode", "");

      Meteor.logout(function() {
      // Redirect to login
      Router.go('home');
      });

      return;

    },
    'click .btnLogoutPatient': function(e, t) {
      Router.go("brokaPatient");
    },
    "autocompleteselect input": function(event, template, doc) {
      console.log("select " + doc);
//      debugger
      Session.set("gpCode", doc.gpCode);
    },
    'click .sentButton': function(e) {
      // Remove the notifications so that we start from scratch again...
      if (Session.get("oldMode")) {
        Meteor.call('removeNotifications', Meteor.user().username);
      } else {
        Meteor.call('removeNotifications', Session.get("userName"));
      }
    },
    'click .btnQuickPatient': function(e, t) {
      if (Session.get("showFavorites")) {
        Session.set("showFavorites", false);
      } else {
        Session.set("showFavorites", true);
      }
    },
    'click .markRead': function(e) {

      if (Session.get("oldMode")) {
        Meteor.call('markRead', Meteor.user().username);
      } else {
        Meteor.call('markRead', Session.get("userName"));
      }
    },
    'click .goHome': function(e) {
      Session.set('accessToken', "");
      Router.go('brokaPage');
    },
    'submit form': function(e, template) {
      e.preventDefault();
    },
    'click .btnPatient': function(e, t) {
      e.preventDefault();

      if (Session.get("showPatients")) {
      Session.set("showPatients", false);
    } else
    {
      Session.set("showPatients", true);
    }

    },
    'click .btnLogout': function(e, t) {
      e.preventDefault();

      Router.go("proLogin");
    }
 });
