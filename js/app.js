window.App = new (Backbone.View.extend({
  start: function() {
    this.render();
    Backbone.history.start({pushState: true});
  },
  events: {
    'click a': function(e) {
      e.preventDefault();
      Backbone.history.navigate(e.target.pathname, {trigger: true});
    }
  },
  template: _.template('<section><h1>Todo List</h1></section>'),
  render: function() {
    this.$el.html(this.template());
    return this;
  },
  Models: {},
  Collections: {},
  Views: {}
}))({el: document.body});
