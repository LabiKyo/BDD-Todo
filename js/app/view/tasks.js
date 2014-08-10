App.View.Tasks = Backbone.View.extend({
  render: function() {
    this.root = new App.Model.Task({
      description: 'root',
      indent: -1,
      complete: false
    });
    this.rootView = new App.View.Task({model: this.root});
    var data = this.load();
    if (data) {
      for (var i in data.children) {
        this.rootView.addChild(this._build(data.children[i]));
      }
      this.rootView.children[0].focus();
    } else {
      this.$el.append(new App.View.NewTask().render().el);
    }
  },
  _build: function(data) {
    var attr = _.omit(data, 'children');
    var model = new App.Model.Task(attr);
    var view = new App.View.Task({model: model});
    this.$el.append(view.render().el);
    for (var i in data.children) {
      view.addChild(this._build(data.children[i]));
    }
    return view;
  },

  save: function(e) {
    window.localStorage.setItem('tasks', JSON.stringify(this.root.toJSON()));
  },
  load: function() {
    try {
      return JSON.parse(window.localStorage.getItem('tasks'));
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  reorder: function() {
    for (var i in this.rootView.children) {
      this._reorder(this.rootView.children[i]);
    }
    return this;
  },
  _reorder: function(parent) {
    this.$el.append(parent.el);
    for (var i in parent.children) {
      this._reorder(parent.children[i]);
    }
  },
  add: function(description, parent, index) {
    parent = parent || this.rootView;
    var model = new App.Model.Task({description: description});
    var view = new App.View.Task({model: model});

    parent.addChild(view, index);

    this.$el.append(view.render().el);
    view.focus();
    this.reorder().save();
  },
});
