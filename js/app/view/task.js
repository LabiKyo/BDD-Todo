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
  focus: function() {
    var input = this.$el.find('input').get(0),
        length = input.value.length;
    input.focus();
    input.setSelectionRange(length, length);
    return this;
  },
  newTask: function() {
    this.$el.after(new App.View.NewTask({
      indent: this.model.get('indent'),
      parent: this.parent,
      index: this.parent.children.indexOf(this) + 1
    }).render().el);
  },
  next: function(n) {
    n = n || 1;
    var $target = this.$el;
    _(n).times(function() {
      $target = $target.next();
    });
    return $target;
  },
  previous: function(n) {
    n = n || 1;
    var $target = this.$el;
    _(n).times(function() {
      $target = $target.prev();
    });
    return $target;
  },
  submit: function(e) {
    e.preventDefault();
    this.model.set('description', this.$el.find('input').val());
    if (this.model.get('description')) {
      App.subview.tasks.save();
      this.newTask();
    }
  }
});
