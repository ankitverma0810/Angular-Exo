var myApp = angular.module('myApp', 
    ['ui.router', 'ngStorage'])
    .constant('SITENAME', 'Exo');

myApp.run(['$http', '$rootScope', '$location', '$timeout', 'Authentication', '$sessionStorage', function($http, $rootScope, $location, $timeout,  Authentication, $sessionStorage) {

    //setting common headers for our app
    $http.defaults.headers.common['X-CSRF-Token'] = $sessionStorage.authToken;

    //state change events
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        $rootScope.$currentState = toState.name;

        if( Authentication.isLoggedIn() ) {
            if( $rootScope.$currentState === 'login' ) {
                $timeout(function() {
                    $location.path('/');
                }, 50);
            }
        }
    });
}]);

myApp.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.
        state('home', {
            url: '/',
            templateUrl: 'views/pages/home.html',
            controller: 'PagesController'
        }).
        state('login', {
            url: '/login',
            templateUrl: 'views/users/login.html',
            controller: 'UsersController'
        });
}]);