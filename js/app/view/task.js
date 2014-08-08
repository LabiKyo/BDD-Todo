App.View.Task = Backbone.View.extend({
  initialize: function() {
    this.children = [];
  },
  events: {
  },
  template: _.template('<form><span class="indent-<%= indent %>"></span><span class="ok"><span class="glyphicon glyphicon-ok-circle"></span></span><input class="task" type="text" value="<%= description %>"/></form>'),
  tagName: 'li',
  className: function() {
    var classes = 'task-container';
    if (this.model.get('complete')) {
      classes += ' complete';
    }
    return classes;
  },
  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  },
  focus: function() {
    this.$el.find('input').focus();
    return this;
  }
});
