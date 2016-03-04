myApp.controller('TaskController', ['$scope', '$http', function($scope, $http) {
  console.log('TaskController loaded!');

  $scope.tasks = [];
  // $scope.taskId;

  var getTasks = function() {
    console.log('entered getTasks function');
    var promise = $http.get('/tasklist').then(function(response) {
      console.log('trying to get from /tasklist');
      $scope.tasks = response.data;
    });
    return promise;
  };

  getTasks();

  //adds a new task
  $scope.addTask = function() {
    console.log('clicked submit button');
    var task = {
      taskName: $scope.taskName,
      taskStatus: true
    };

    $http.post('/tasklist', task).then(function(response) {
      console.log('Saved this task: ', task);
      $scope.tasks = response.data;
      console.log('task array: ', $scope.tasks);
    });

    $scope.taskName = '';
  };

  $scope.completeTask = function(id) {
    console.log('entered completeTask function. Task ID: ', id);
    $http.put('/tasklist/' + id).then(function() {
      console.log('updated task status to false');
    });
    getTasks();
  };

  $scope.deleteTask = function(id) {
    console.log('entered delete task function');
    $http.delete('/tasklist/' + id).then(function() {
      console.log('deleted task');
    });
    getTasks();
  };

}]);
