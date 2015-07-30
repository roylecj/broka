Template.documentItem.helpers({
  ext: function() {
    return this.name.split('.').pop()
  },
  dateCreated: function() {
    return moment(this.createdAt).fromNow();
    }
});
