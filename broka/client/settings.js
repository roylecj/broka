Template.settings.helpers({
    settingItem: function() {
      return UserSettings.find({}, {sort: {key: 1}}).fetch();
    },
    isEditing: function() {
      if (this.key === Session.get("editing")) {
        return true
      } else {
        return false
      }
    }
  });
  
  Template.settings.events({
    'click .btnSave': function(e, t) {
      e.preventDefault();
  
      var settingValue = $(document).find('[name=inputSetting]').val();
  
      settingKey = this.key;
  
      Meteor.call("saveSetting", settingKey, settingValue, function(e, r) {
        if (! e) {
          console.log("Saved");
          Session.set("editing", "");
        } else {
          sAlert.error("Unable to save " + e);
        }
      });
    },
    'click .btnCancel': function(e, t) {
      Session.set("editing", "");
    },
    'click .btnEdit': function(e, t) {
      Session.set("editing", this.key);
    }
  })
  