App.View.Task = Backbone.View.extend({
  initialize: function() {
    this.children = [];
  },
  events: {
    'submit': 'submit'
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

  // event handler
  submit: function(e) {
    e.preventDefault();
    var value = this.$el.find('input').val();
    if (value) {
      this.model.set('description', value);
      App.subview.tasks.save();
      this.newTask();
    }
  },
  // helper
  addChild: function(child, index) {
    index = index || this.children.length;
    this.children.splice(index, 0, child);
    child.parent = this;

    this.model.children.splice(index, 0, child.model);
    child.model.parent = this.model;
    child.model.set('indent', this.model.get('indent') + 1);
  },
  newTask: function() {
    this.$el.after(new App.View.NewTask({
      indent: this.model.get('indent'),
      parent: this.parent,
      index: this.parent.children.indexOf(this) + 1
    }).render().el);
  },
  focus: function() {
    var input = this.$el.find('input').get(0),
        length = input.value.length;
    input.focus();
    input.setSelectionRange(length, length);
    return this;
  },
});
