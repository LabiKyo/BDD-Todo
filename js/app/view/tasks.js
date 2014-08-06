App.View.Tasks = Backbone.View.extend({
  initialize: function() {
  },
  render: function() {
    this.collection.forEach(function(task) {
      var view = new App.View.Task({
        model: task
      });
      this.$el.append(view.render().el);
    }, this);
    return this;
  }
});
