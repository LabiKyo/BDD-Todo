App.View.Task = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },
  events: {
    'click span.ok': 'toggleComplete'
  },
  template: _.template('<form><span class="glyphicon glyphicon-ok-circle ok"></span><input class="task" type="text" value="<%= description %>"/></form>'),
  tagName: 'li',
  className: 'task-container clearfix',
  render: function() {
    var attrs = this.model.attributes;
    if (attrs.complete) {
      this.$el.addClass('complete');
    } else {
      this.$el.removeClass('complete');
    }
    this.$el.html(this.template(attrs));
    return this;
  },

  toggleComplete: function(e) {
    this.model.set('complete', !this.model.get('complete'));
  }
});
