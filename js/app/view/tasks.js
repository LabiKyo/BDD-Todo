App.View.Tasks = Backbone.View.extend({
  initialize: function() {
    this.root = new App.Model.Task({
      description: 'root',
      indent: -1,
      complete: false
    });
    this.rootView = new App.View.Task({model: this.root});
  },
  render: function() {
    for (var node in this.rootView.children) {
      this.renderNode(this.rootView.children[node]);
    }
  },
  renderNode: function(parent) {
    this.$el.append(parent.render().el);
    for (var node in parent.children) {
      this.renderNode(parent.children[node]);
    }
  },

  add: function(task, parent) {
    parent = parent || this.rootView;
    var view = new App.View.Task({model: task});

    parent.children.push(view);
    parent.model.children.push(task);

    view.parent = parent;
    task.parent = parent.model;

    task.set('indent', parent.model.get('indent') + 1);
  },
});
