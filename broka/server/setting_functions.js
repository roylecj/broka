Meteor.methods({
    saveSetting(key, value) {
        var settingRec = UserSettings.findOne({key: key});
  
        if (settingRec) {
    
            var dataType = settingRec.dataType;
            var isValid = true;
            if (dataType === "INT") {
              if (isNaN(value)) {
                isValid = false;
                throw new Meteor.Error('Invalid-Data-Type', "Enter a numeric value for " + key);
              }
            }
    
            if (isValid) {
              UserSettings.update({key: key}, {$set: {value: value}});
            }
        }
    }
})