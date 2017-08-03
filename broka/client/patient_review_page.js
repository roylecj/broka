Template.patientReviewPage.helpers({
    brokaPatientPageURL: function() {
      // Need to call the broka service to get an access token first... and then
      // we can login using that token...

        var URLstring = "https://schedulingdemo.healthhost.net/ultragendabroka/referrer/default.aspx?accesstoken=" + Session.get("accessTokenPatient");

        console.log("brokaPatientPageURL= " + URLstring);

        return URLstring;
    },
    isAccessToken: function() {
        if (Session.get("accessTokenPatient")) {
          return true;
        } else {
          return false;
        }
    }
});
