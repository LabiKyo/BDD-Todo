App.View.Task = Backbone.View.extend({
  initialize: function() {
  },
  events: {
    'click span.ok': 'toggleComplete',
    'submit': function(e) { e.preventDefault(); },
    'keydown': 'handleKeyboard'
  },
  template: _.template('<form><span class=" ok"><span class="glyphicon glyphicon-ok-circle"></span></span><input class="task" type="text" value="<%= description %>"/></form>'),
  indentTemplate: _.template('<span class="indent"></span>'),
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

  toggleComplete: function() {
    this.model.set('complete', !this.model.get('complete'));
    this.$el.toggleClass('complete').find('input').focus();
  },
  handleKeyboard: function(e) {
    switch (e.keyCode) {
      case App.KeyCodes.enter:
        e.preventDefault();
      break;
      case App.KeyCodes.tab:
        e.preventDefault();
        console.log(e);
        if (e.shiftKey) {
          this.decreaseIndent();
        } else {
          this.increaseIndent();
        }
      break;
      case App.KeyCodes.c:
        if (e.ctrlKey) {
          e.preventDefault();
          this.toggleComplete();
        }
      break;
      case App.KeyCodes.n:
      break;
      case App.KeyCodes.p:
      break;
    }
  },
  increaseIndent: function() {
    this.$el.find('form').prepend(this.indentTemplate());
  },
  decreaseIndent: function() {
    this.$el.find('span.indent:first').remove();
  }
});
