var mongoose = require ('mongoose');
var Todo =require ('./models/todo');

mongoose.connect('mongodb://localhost/todos');

function quit(){
  mongoose.disconnect();
  console.log('\nQuitting!');
}

function handleError(err){
  console.log('ERROR: ', err);
  quit();
  return err;
}

console.log('removing old todos...');
Todo.remove({})
.then(function(){
  console.log('old todos removed');
  console.log('Creating some new todos...');
  var groceries = new Todo({
    title: 'groceries',
    completed: false
  });
  var feedtheCat = new Todo({
    title: 'smelly cat',
    completed: false
  });
  return Todo.create([groceries, feedtheCat]);
})
.then(function(savedTodos){
  console.log('Todos have been saved!');
  return Todo.find({});
})
.then(function(allTodos){
  console.log('Printing all Todos');
  allTodos.forEach(function(todo){
    console.log(todo);
  });
  quit();
});
