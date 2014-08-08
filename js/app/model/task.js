App.Model.Task = Backbone.Model.extend({
  initialize: function(options) {
    this.set('complete', options.complete || false);
    this.set('indent', options.indent || 0);
    this.children = [];
  },
  add: function(task) {
    this.children.push(task);
    task.parent = this;
    task.set('indent', this.get('indent') + 1);
  }
});
