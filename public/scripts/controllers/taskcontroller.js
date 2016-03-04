myApp.controller('TaskController', ['$scope', '$http', function($scope, $http) {
  console.log('TaskController loaded!');

  $scope.tasks = [];

  var getTasks = function() {
    var promise = $http.get('/tasklist').then(function(response) {
      $scope.tasks = response.data;
    });
    return promise;
  };

  getTasks();

  //adds a new task
  $scope.addTask = function() {
    var task = {
      taskName: $scope.taskName,
      taskStatus: false
    };

    $http.post('/tasklist', task).then(function(response) {
      $scope.tasks = response.data;
    });

    $scope.taskName = '';
  };

//completes a task
  $scope.completeTask = function(id) {
    $http.put('/tasklist/completed/' + id).then(function() {
    });
    getTasks();
  };

//sets task back to incomplete
  $scope.redoTask = function(id) {
    $http.put('/tasklist/incomplete/' + id).then(function() {
    });
    getTasks();
  };

//deleted task from db
  $scope.deleteTask = function(id) {
    var confirmation = confirm("Press OK to DELETE task");

    if (confirmation === true) {
      $http.delete('/tasklist/' + id).then(function() {
      });
      getTasks();
    }
  };

}]);
