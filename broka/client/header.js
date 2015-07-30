Template.header.helpers({
    currentUserName: function() {
      return Meteor.user().username;
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
      return {
        userId: Meteor.user.userName
        }
    },
    notificationCount: function() {
      var countNotifications = Notifications.find( {userId: Meteor.user().username} ).count();

      return countNotifications;
    },
    statusUpdateCount: function() {

       return ReferralStatus.find( {userId: Meteor.user().username, readFlag: false}).count();
    },
    messageText: function() {

       var cnt = 0;

       cnt = ReferralStatus.find( {userId: Meteor.user().username, readFlag: false}).count();
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
    messages: function() {
      return ReferralStatus.find( {userId: Meteor.user().username, readFlag: false});
    }
 });

 Template.header.events({
    'click .buttonLogout': function(e) {
      Meteor.logout(function() {
      // Redirect to login
      Router.go('home');
      });

      return;

    },
    'click .sentButton': function(e) {
      // Remove the notifications so that we start from scratch again...
      Meteor.call('removeNotifications', Meteor.user().username);
    },
    'click .markRead': function(e) {
      Meteor.call('markRead', Meteor.user().username);
    },
    'click .goHome': function(e) {
      Session.set('accessToken', "");
      Router.go('brokaPage');
    }
 });
