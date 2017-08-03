
Template.proPage.helpers({
    proPageURL: function() {
      var urlString = "https://schedulingdemo.healthhost.net/ultragendapro/default.asp?contextMode=2&orgLogin=admin&orgPassword=fl0wer&newWindow=0&marginInPercent=0";

      console.log("url=" + urlString);

      return urlString;
    }
});
