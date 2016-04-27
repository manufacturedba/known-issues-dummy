/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('todomvc')
  .controller('TodoDetailCtrl', function TodoCtrl($scope, $routeParams, $filter, store) {
    'use strict';
    store.todos.forEach(function(todo) {
      if (todo.id == $routeParams.id) {
        console.log(todo);
        $scope.todo = todo;
      }
    });
  });
