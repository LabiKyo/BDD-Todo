App.View.NewTask = Backbone.View.extend({
  initialize: function(options) {
    options = options || {};
    this.indent = options.indent || 0;
    this.parent = options.parent || App.subview.tasks.rootView; // REVIEW: necessary?
    return this;
  },
  events: {
    'submit': 'submit'
  },
  template: _.template('<form><span class="indent-<%= indent %>"></span><span class="ok"></span><input autofocus class="task" type="text" value="" placeholder="What do you want to do next?"/></form>'),
  tagName: 'li',
  className: 'task-container',
  render: function() {
    this.$el.html(this.template({indent: this.indent}));
    return this;
  },

  submit: function(e) {
    e.preventDefault();
    var description = this.$el.find('input').val();
    var model = new App.Model.Task({description: description});
    App.subview.tasks.add(model, this.parent);
    this.remove();
  }
});

