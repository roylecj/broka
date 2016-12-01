Template.heightWeight.helpers({
  bmiValue: function() {
    return Session.get("bmiValue");
  },
  bsaValue: function() {
    return Session.get("bsaValue");
  }
});
Template.heightWeight.events({
  "keyup .wght": function(e, template){

    var h =  $(e.target.parentNode.parentNode.parentNode).find("[name=hght]").val();
    var w = $(e.target.parentNode.parentNode.parentNode).find('[name=w]').val();

    if (h !== 0 && h !== "" & w !== 0 && w !== "") {
      var bmi;
      var bsa;

      bmi = w / ((h/100) * (h/100));
      bsa = Math.sqrt((h * w) / 3600);

      bsa = Math.round(bsa * 10) / 10
      Session.set("bmiValue", Math.round(bmi));
      Session.set("bsaValue", bsa);
    }

  },
  "keyup .hght": function(e, template){

    var h =  $(e.target.parentNode.parentNode.parentNode).find("[name=hght]").val();
    var w = $(e.target.parentNode.parentNode.parentNode).find('[name=w]').val();

    if (h !== 0 && h !== "" & w !== 0 && w !== "") {
      var bmi;
      var bsa;

      bmi = w / ((h/100) * (h/100));
      bsa = Math.sqrt((h * w) / 3600);

      bsa = Math.round(bsa * 10) / 10

      Session.set("bmiValue", Math.round(bmi));
      Session.set("bsaValue", bsa);
    }
  }
});
