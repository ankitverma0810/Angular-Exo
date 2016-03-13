angular.module('userRouter', []).
    config(['$stateProvider', function($stateProvider) {
        $stateProvider.
            state('register', {
                url: '/register',
                templateUrl: 'views/users/register.html',
                controller: 'UsersController',
                parent: 'loginLayout'
            }).
            state('login', {
                url: '/login',
                templateUrl: 'views/users/login.html',
                controller: 'UsersController',
                parent: 'loginLayout'
            });
}]);