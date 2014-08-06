App.Model.Task = Backbone.Model.extend({
  initialize: function(options) {
    this.complete = options.complete || false;
  }
});
