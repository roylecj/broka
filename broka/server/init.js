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
    getPatientDetails: function(patientId, doc) {
      var patientRec = {};
/*
      if (doc.location.hostname !== "10.4.0.7") {
        throw new Meteor.error("unauthorised", "Unable to use this function");
        return {}
      }*/
      var url = "http://10.4.0.17:4300/?" + patientId;

      try {
        var result = HTTP.call("GET", url,
        {
          followRedirects: true
        })
      } catch (e) {
        console.log(e);
      };

      patientRec = JSON.parse(result.content);

      return patientRec
    },
    isVPNEnabled: function(url) {
      if (url.document.URL.startsWith("http://10.4.0.7")) {
        return true
      } else {
        return false
      }
    },
    callViaduct: function (url) {
//      console.log("callViaduct=" + url);

//      this.unblock();

      try {
        var result = HTTP.call("GET", url,
        {
          followRedirects: true
        })
      } catch (e) {
        console.log(e);
      };

//      console.log(result.content);

      return result.content;
    },
    postViaduct: function (url, param) {
      console.log("postViaduct=" + url);
      console.log("param=" + param);
//      this.unblock();

      try {
        HTTP.call("POST", url,
        {
          content: param
        })
      } catch (e) {
        console.log("error=" + e);
      };

      return;
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
    removeDocs: function(patId) {
      Uploads.remove({patientId: patId}, true);
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
    },
    getGPpractices: function(urlString) {
      this.unblock();

      var respValue = "";
      respValue = Meteor.call('callViaduct', urlString, function(e, result) {
        console.log("response= " + result);

        //Session.set("accessToken", result);

        return result;
      });
    }
});

// if (Practices.find().count() === 0) {

  Practices.remove({});

  Practices.insert({
    userId: 'darm',
    gpCode: 'darm',
    practice: 'Ipswich Family Practice'
  });

  Practices.insert({
    userId: 'darm',
    gpCode: 'darm',
    practice: 'Ipswich General Practice'
  });

  Practices.insert({
    userId: 'darm',
    gpCode: 'darm',
    practice: 'Ipswich Plaza Practice'
  });

  GPS.insert({
    gpName: 'Dennis Armstrong',
    gpCode: 'darm'
  });

  GPS.insert({
    gpName: 'Peter Armstrong',
    gpCode: 'parm'
  });

  GPS.insert({
    gpName: 'Jane Armstrong',
    gpCode: 'jarm'
  });

  GPS.insert({
    gpName: 'Jane Smith',
    gpCode: 'jsmit'
  });


// };
