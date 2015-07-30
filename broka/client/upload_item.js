Template.uploadItem.events({
  "click .deleteButton": function(e, template){
    Uploads.remove(this._id);
  }
});
