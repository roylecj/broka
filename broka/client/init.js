Meteor.startup(function() {
  Uploader.finished = function(index, fileInfo, templateContext) {
    var myFileInfo = _.extend(fileInfo, {
      userId: Meteor.user().username,
      createdAt: new Date(),
      patientId: null
    });

    // Now we have the userId in the file list...

    Uploads.insert(myFileInfo);

    Session.set("documentsUploaded", false);
  }
})
