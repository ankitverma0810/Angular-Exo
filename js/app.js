var myApp = angular.module('myApp', 
    ['ui.router', 'ngStorage', 'appRouter'])
    .constant('myConfig', {
        SITENAME: 'EXO',
        ROOT: '/',
        URL: '/exo-backend',
        API: '/admin'
    })
    .directive('ngConfirmClick', [function() {
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click', function(event) {
                    if ( window.confirm(msg) ) {
                        scope.$eval(clickAction);
                    }
                });
            }
        };
    }])
    .directive('ngFileUpload', ['uploadManager', function (uploadManager) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ngModel) {
                element.bind('change', function(event) {
                    //scope.$eval(attr.ngFileUpload);
                    ngModel.$setViewValue(element[0].files[0]);
                    ngModel.$render();
                });

            }
        };
    }]);

myApp.run(['$rootScope', 'Authentication', function($rootScope, Authentication) {
    //Authentication service is being required here (so that authToken can be set on load)
    //state change events
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        $rootScope.$currentState = toState.name;
    });
}]);