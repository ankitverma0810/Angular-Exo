angular.module('userRouter', []).
    config(['$stateProvider', function($stateProvider) {
        $stateProvider.
            state('register', {
                url: '/register',
                templateUrl: 'views/users/register.html',
                controller: 'UsersController',
                parent: 'defaultLayout',
                resolve: {
                    checkAuth: ['Authentication', '$location', '$timeout', function(Authentication, $location, $timeout) {
                        if( Authentication.isLoggedIn() ) {
                            $timeout(function() {
                                $location.path('/dashboard');
                            }, 100);
                        } else {
                            return true;
                        }
                    }]
                }
            }).
            state('login', {
                url: '/login',
                templateUrl: 'views/users/login.html',
                controller: 'UsersController',
                parent: 'loginLayout',
                resolve: {
                    checkAuth: ['Authentication', '$location', '$timeout', function(Authentication, $location, $timeout) {
                        if( Authentication.isLoggedIn() ) {
                            $timeout(function() {
                                $location.path('/dashboard');
                            }, 100);
                        } else {
                            return true;
                        }
                    }]
                }
            });
}]);