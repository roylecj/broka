Meteor.startup(function () {

  // Uploads.remove({});

  UploadServer.init({
    tmpDir: '/uploads/tmp',
    uploadDir: '/uploads/',
    uploadUrl: '/upload/',
    checkCreateDirectories: true,
    overwrite: false,
    mimeTypes: {
      "pdf": "application/pdf"
    }
  });
});

Meteor.methods({
    updateByUser: function(userId, patientId, deptId, doctor) {
      console.log('updateByUser');

      // This is not updating each of the files..

      Uploads.update({userId: userId, patientId: null}, {$set: {patientId: patientId, dept: deptId, createdBy: doctor}}, { multi: true});

    },
    callViaduct: function (url) {
      console.log("callViaduct=" + url);

//      this.unblock();

      try {
        var result = HTTP.call("GET", url,
        {
          followRedirects: true
        })
      } catch (e) {
        console.log(e);
      };

      console.log(result.content);

      return result.content;
    },
    insertNotification: function(userId) {
      Notifications.insert( {userId: userId});
    },
    removeNotifications: function(userId) {
      Notifications.remove( {userId: userId});
    },
    insertPatient: function(patientId) {
      PatientList.insert( {patientId: patientId });
    },
    insertReferralStatus: function(userId, patientId, seqId, noteText) {

      // We insert a new status whenever there is a cancellation.

      var cntRecords = ReferralStatus.find( {
          userId: userId,
          patientId: patientId,
          seqId: seqId
      }).count();

      if (cntRecords === 0) {

        console.log("Count = 0");

        ReferralStatus.insert ( {
          userId: userId,
          patientId: patientId,
          seqId: seqId,
          noteText: noteText,
          readFlag: false } );
      }

    },
    markRead: function(userId) {
      ReferralStatus.update( {userId: userId}, {$set: {readFlag: true} }, { multi: true} );
    },
    readItem: function(messageId) {
      console.log(messageId);
      console.log("item is flagged as read");
      ReferralStatus.update( {_id: messageId}, {$set: {readFlag: true}} );
    },
    getAccessToken: function(urlString) {
      // Session.set("accessToken", "");

      this.unblock();

      var respValue = "";
      respValue = Meteor.call('callViaduct', urlString, function(e, result) {
        console.log("response= " + result);

        //Session.set("accessToken", result);

        return result;
      });

    }
});
