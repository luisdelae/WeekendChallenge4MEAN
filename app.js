var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/tasksdb');
mongoose.model(
  'Task',
  new Schema({
    "taskName": String,
    "taskStatus": Boolean
  },
  {
    collection: 'tasks'
  }
));

var Task = mongoose.model('Task');

app.post('/tasklist', function(req, res) {

  console.log('in /tasklist post req.body: ', req.body);

  var addTask = new Task({
    "taskName": req.body.taskName,
    "taskStatus": req.body.taskStatus
  });
  addTask.save(function(err, data) {
    if(err) {
      console.log('ERROR:', err);
    }
    Task.find({}, function(err, data) {
      if(err) {
        console.log('ERROR:: ', err);
      }
      res.send(data);
    });
  });
});

app.get('/tasklist', function(req, res) {
  console.log('in task list get on server');
  Task.find({}, function(err, data) {
    if (err) {
      console.log('ERROR:', err);
    }
    res.send(data);
  }).sort('-taskStatus');
});

app.put('/tasklist/:id', function(req, res) {

  var updateTask = {
    "taskStatus": false,
  };

  Task.findByIdAndUpdate(
    {_id: req.params.id},
    {
      $set:
        {taskStatus: updateTask.taskStatus}
    },
    function(err, data) {
      if (err) {
        console.log('ERROR:', err);
      }
      res.send(data);
    }
  );
});

app.delete('/tasklist/:id', function(req, res) {
  console.log('id to delete', req.params.id);
  Task.findByIdAndRemove({"_id": req.params.id}, function(err, data) {
    if (err) {
      console.log('ERROR:', err);
    }
    res.send(data);
  });
});

app.use(express.static('public'));
app.use(express.static('public/views'));
app.use(express.static('public/scripts'));
app.use(express.static('public/styles'));
app.use(express.static('public/vendors'));

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
  console.log('Listening on port: ', app.get('port'));
});
