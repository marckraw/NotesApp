(function() {

  angular.module('appDirectives', [])
      .directive('directiveShortNote', function () {
        return {
          restrict: 'E',
          templateUrl: 'templates/directives/directive-short-note.html'
        };
      });

})();
