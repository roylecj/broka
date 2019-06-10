if (UserSettings.find().count() === 0) {
    UserSettings.insert({key: "CISCO_ACTIVE", dataType: "STRING", value: "true"});
}
