Meteor.publish('userSettings', function() {
    return UserSettings.find();
});
