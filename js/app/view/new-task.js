App.View.NewTask = App.View.Task.extend({
  initialize: function(options) {
    options = options || {};
    this.indent = options.indent || 0;
    this.parent = options.parent || App.subview.tasks.rootView;
    this.index = options.index || 0;
    return this;
  },
  template: _.template('<form><span class="indent-<%= indent %>"></span><span class="ok"></span><input autofocus class="task" type="text" value="" placeholder="What do you want to do next?"/></form>'),
  className: 'task-container',
  render: function() {
    this.$el.html(this.template({indent: this.indent}));
    this.focus();
    return this;
  },

  submit: function(e) {
    e.preventDefault();
    var description = this.$el.find('input').val();
    if (description) {
      App.subview.tasks.add(description, this.parent, this.index);
      this.remove();
    }
  }
});

