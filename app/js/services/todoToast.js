var mod = angular.module('todomvc');

mod.service('toastSrvc', [function() {
  var toastElement = document.querySelector('#toast');
  return {
    open: function(text) {
      toastElement.text = text;
      toastElement.open();
    }
  }
}]);