App.Model.Task = Backbone.Model.extend({
  initialize: function(options) {
    this.set('complete', options.complete || false);
  }
});
