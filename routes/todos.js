var express = require('express');
var router = express.Router();
var Todo = require('../models/todo');


//INDEX
router.get('/', function(req, res, next){
  //TODO get all the todos and render the index view.
  Todo.find({})
  .then(function(todos){
    res.render('todos/index', {todos: todos});
  }, function(err){
    return next(err);
  });
});


//NEW
router.get('/new', function(req,res,next){
  var todo = {
    title: '',
    completed: false
  };
  res.render('todos/new', {todo: todo});
});


//SHOW
router.get('/:id', function(req, res, next){
  Todo.findById(req.params.id)
  .then(function(todo){
    res.render('todos/show', {todo: todo});
  }, function(err){
    return next(err);
  });
});

//CREATE
router.post('/', function(req, res, next){
  var todo= new Todo({
    title: req.body.title,
    completed: req.body.completed ? true : false
  });
  todo.save()
  .then(function(saved){
    res.redirect('/todos');
  }, function(err){
    return next(err);
  });
});

//EDIT
router.get('/:id/edit', function(req,res,next){
  Todo.findById(req.params.id)
  .then(function(todo){
    res.render('todos/edit', {todo: todo});
  }, function(err){
    return next(err);
  });
});

//UPDAATE
router.put('/:id', function(req,res,next){
  Todo.findById(req.params.id)
  .then(function(todo){
    todo.title = req.body.title;
    todo.completed = req.body.completed ? true : false;
    return todo.save();
  })
  .then(function(saved){
    res.redirect('/todos');
  }, function(err){
    return next(err);
  });
});
module.exports = router;

//DESTRYOY
router.delete('/:id', function(req, res, next){
  Todo.findByIdAndRemove(req.params.id)
  .then(function(){
    res.redirect('/todos');
  }, function(err){
    return next(err);
  });
});
