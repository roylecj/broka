Template.headerNew.onCreated(function() {
    Session.setDefault("gpCode", "");
    Session.setDefault("showFavorites", "");
});

Template.headerNew.helpers({
    currentUserEntered: function() {
       if (Session.get("signedIn")) {
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

 Template.headerNew.events({
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
    }
 });
