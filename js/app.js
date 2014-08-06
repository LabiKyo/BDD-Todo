window.App = new (Backbone.View.extend({
  start: function() {
    this.tasks = new App.Collection.Tasks([{description: 'finish this backbone app'}, {description: 'second task', complete: true}]);
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
      collection: this.tasks,
      el: this.$el.find('#tasks')
    });
    this.subview.tasks.render();
    return this;
  },
  Model: {},
  Collection: {},
  View: {}
}))({el: document.body});
