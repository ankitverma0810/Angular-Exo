var myApp = angular.module('myApp', 
    ['ui.router', 'ngStorage', 'userRouter', 'pageRouter', 'dashboardRouter', 'bannerRouter'])
    .constant('myConfig', {
        SITENAME: 'EXO',
        ROOT: '/',
        URL: '/exo-backend',
        API: '/admin'
    })
    .directive('ngConfirmClick', [
        function(){
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.confirmedClick;
                    element.bind('click',function (event) {
                        if ( window.confirm(msg) ) {
                            scope.$eval(clickAction);
                        }
                    });
                }
            };
    }])
    .directive('ngFileUpload', function (uploadManager) {
        return {
            restrict: 'A',
            scope: true,
            link: function (scope, element, attr) {
                element.bind('change', function () {
                    var formData = new FormData();
                    formData.append('file', element[0].files[0]);
                    uploadManager('/exo-backend/admin/banners/uploadFile', formData, function (callback) {
                        console.log(callback);
                        //need to work from here
                        //need to store filename inside hidden input available in the form
                    });
                });

            }
        };
    });

myApp.run(['$rootScope', 'Authentication', function($rootScope, Authentication) {
    //Authentication service is being required here (so that authToken can be set on load)
    //state change events
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        $rootScope.$currentState = toState.name;
    });

    $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
        //empty all the flash messages if any
        $rootScope.alerts = [];
    });
}]);

myApp.config(['$httpProvider', '$urlRouterProvider', '$stateProvider', function($httpProvider, $urlRouterProvider, $stateProvider) {

    //Http Intercpetor to check auth failures for xhr requests
    $httpProvider.interceptors.push('authHttpResponseInterceptor');

    //app routes
    $urlRouterProvider.otherwise('/');
    $stateProvider.
        state('defaultLayout', {
            abstract: true,
            views: {
                'layout': {
                    templateUrl: 'views/layouts/default.html'
                },
                'header@defaultLayout': {
                    templateUrl: 'views/elements/header.html',
                    controller: 'HeaderController'
                },
                'footer@defaultLayout': {
                    templateUrl: 'views/elements/footer.html',
                    controller: 'FooterController'
                },
                'alert@defaultLayout': {
                    templateUrl: 'views/layouts/alert.html',
                    controller: 'AlertController'
                }
            },
            resolve: {}
        }).
        state('loginLayout', {
            abstract: true,
            views: {
                'layout': {
                    templateUrl: 'views/layouts/login.html'
                },
                'alert@loginLayout': {
                    templateUrl: 'views/layouts/alert.html',
                    controller: 'AlertController'
                }
            }
        });
}]);