/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('todomvc')
  .controller('TodoDetailCtrl', function TodoCtrl($scope, $routeParams, $filter, $http, $sce, store) {
    'use strict';
    store.todos.forEach(function(todo) {
      if (todo.id == $routeParams.id) {
        console.log(todo);
        $scope.todo = todo;
        $scope.myContent= $sce.trustAsHtml(todo.description.value.replace(/\n/g, "<br />") || "No Description");
      }
    });
    
    var toggle = document.querySelector("paper-toggle-button");
    toggle.addEventListener('change', function () {
      if (this.checked) {
        $scope.$apply(function() {
          $scope.todo.verified = true;
        });
        $http({
          method: 'GET',
          url: 'http://localhost:7777/notification/' + $scope.todo.id
        });
      } else {
        $scope.$apply(function() {
          $scope.todo.verified = false;
        });
      }
      
      store.put($scope.todo, store.todos.indexOf($scope.todo));
    }); 
  });
