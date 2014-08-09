App.View.Tasks = Backbone.View.extend({
  events: {
    'keydown': 'handleKey'
  },
  render: function() {
    this.root = new App.Model.Task({
      description: 'root',
      indent: -1,
      complete: false
    });
    this.rootView = new App.View.Task({model: this.root});
    var data = this.load();
    if (data) {
      for (var child in data.children) {
        var childView = this._build(data.children[child]);
        this.rootView.children.push(childView);
        this.root.children.push(childView.model);
      }
    } else {
      this.$el.append(new App.View.NewTask().render().el);
    }
  },
  _build: function(data) {
    var attr = _.omit(data, 'children');
    var model = new App.Model.Task(attr);
    var view = new App.View.Task({model: model});
    this.$el.append(view.render().el);
    for (var node in data.children) {
      var childView = this._build(data.children[node]);
      view.children.push(childView);
      model.children.push(childView.model);
    }
    return view;
  },

  save: function() {
    window.localStorage.setItem('tasks', JSON.stringify(this.root.toJSON()));
  },
  load: function() {
    return JSON.parse(window.localStorage.getItem('tasks'));
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
    this.save();
  },

  handleKey: function(e) {
    console.log(e.target);
  }
});
