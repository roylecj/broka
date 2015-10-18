Uploads = new Mongo.Collection('fileUploads');
Notifications = new Mongo.Collection('notifications');
PatientList = new Mongo.Collection('patientList');
ReferralStatus = new Mongo.Collection('referralStatus');
Practices = new Mongo.Collection('practices');
GPS = new Mongo.Collection('gps');

// Uploads.remove({});

Practices.allow({
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

GPS.allow({
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
