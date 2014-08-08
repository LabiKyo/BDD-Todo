window.App = new (Backbone.View.extend({
  start: function() {
    this.subview = {};
    this.render();
    Backbone.history.start({pushState: true});
  },
  events: {
    'click a': function(e) {
      e.preventDefault();
      Backbone.history.navigate(e.target.pathname, {trigger: true});
    }
  },
  template: _.template('<section id="app" class="container"><h1 class="text-center">Todo List</h1><ul id="tasks" class="list-unstyled"></ul></section>'),
  render: function() {
    this.$el.html(this.template());
    this.subview.tasks = new App.View.Tasks({
      el: this.$el.find('#tasks')
    });
    this.subview.tasks.add(new App.Model.Task({description: 'task1'}));
    this.subview.tasks.add(new App.Model.Task({description: 'task2', complete: true}));
    this.subview.tasks.add(new App.Model.Task({description: 'task3'}), this.subview.tasks.rootView.children[0]);
    this.subview.tasks.render();
    return this;
  },
  Model: {},
  Collection: {},
  View: {},
  KeyCodes: {
    tab: 9,
    enter: 13,
    c: 67,
    n: 78,
    p: 80
  }
}))({el: document.body});
