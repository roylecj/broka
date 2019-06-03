Template.proPage.onRendered(function() {
  Session.set("checkStatus", true);
});

Template.proPage.helpers({
    proPageURL: function() {
      var urlString = "";

      urlString = Session.get("ugproLink");
      console.log("url=" + urlString);

      return urlString;
    }
});
