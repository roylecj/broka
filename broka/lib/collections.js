Uploads = new Mongo.Collection('fileUploads');
Notifications = new Mongo.Collection('notifications');
PatientList = new Mongo.Collection('patientList');
ReferralStatus = new Mongo.Collection('referralStatus');

// Uploads.remove({});

Uploads.allow({
  update: function(userId, doc) {
    return true;
  },
  insert: function(userId, doc) {
    return true;
  },
  remove: function(userId, doc) {
    return true;
  }
});

Notifications.allow({
  update: function(userId, doc) {
    return true;
  },
  insert: function(userId, doc) {
    return true;
  },
  remove: function(userId, doc) {
    return true;
  }
});

PatientList.allow({
  update: function(userId, doc) {
    return true;
  },
  insert: function(userId, doc) {
    return true;
  },
  remove: function(userId, doc) {
    return true;
  }
});

ReferralStatus.allow({
  update: function(userId, doc) {
    return true;
  },
  insert: function(userId, doc) {
    return true;
  },
  remove: function(userId, doc) {
    return true;
  }
})
