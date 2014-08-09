App.Model.Task = Backbone.Model.extend({
  initialize: function(options) {
    this.set('complete', options.complete || false);
    this.set('indent', options.indent || 0); // REVIEW: may not be useful
    this.children = [];
  },
  add: function(task) {
    this.children.push(task);
    task.parent = this;
    task.set('indent', this.get('indent') + 1);
  },
  toJSON: function() {
    var children = [];
    for (var node in this.children) {
      children.push(this.children[node].toJSON());
    }
    var json = _.clone(this.attributes);
    if (children.length) {
      _(json).extend({children: children});
    }
    return json;
  }
});
