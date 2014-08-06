App.Collection.Tasks = Backbone.Collection.extend({
  localStorage: new Backbone.LocalStorage('BDD-Todo-tasks'),
  model: App.Model.Task
});
