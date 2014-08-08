App.View.Tasks = Backbone.View.extend({
  initialize: function() {
    this.root = new App.Model.Task({
      description: 'root',
      indent: -1,
      complete: false
    });
    this.rootView = new App.View.Task({model: this.root});
  },
  events: {
    'keydown': 'handleKey'
  },
  render: function() {
    for (var node in this.rootView.children) {
      this.renderNode(this.rootView.children[node]);
    }
    if (this.rootView.children.length === 0) {
      this.$el.append(new App.View.NewTask().render().el);
    }
  },
  renderNode: function(parent) {
    this.$el.append(parent.render().el);
    for (var node in parent.children) {
      this.renderNode(parent.children[node]);
    }
  },

  reorder: function() {
    for (var node in this.rootView.children) {
      this._reorder(node);
    }
  },
  _reorder: function(parent) {
    this.$el.append(parent.el);
    for (var node in parent.children) {
      this._reorder(node);
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
    view.render();
    this.$el.append(view.el);
    this.reorder();
    view.focus();
  },

  handleKey: function(e) {
    console.log(e.target);
  }
});
