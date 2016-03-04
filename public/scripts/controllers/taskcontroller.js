myApp.controller('TaskController', ['$scope', '$http', function($scope, $http) {
  console.log('TaskController loaded!');

  $scope.tasks = [];
  $scope.completeClass = {green:false};

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
      taskStatus: true
    };

    $http.post('/tasklist', task).then(function(response) {
      $scope.tasks = response.data;
    });

    $scope.taskName = '';
  };

  $scope.completeTask = function(id) {
    $http.put('/tasklist/' + id).then(function() {
    });
    getTasks();
  };

  $scope.deleteTask = function(id) {
    var confirmation = confirm("Press OK to DELETE task");

    if (confirmation === true) {
      $http.delete('/tasklist/' + id).then(function() {
      });
      getTasks();
    }
  };

// var addClass = function(status) {
//   if(status === false) {
//    $scope.completeClass.green = true;
//   }
// };

}]);
