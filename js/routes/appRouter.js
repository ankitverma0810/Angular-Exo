angular.module('appRouter', ['userRouter', 'pageRouter', 'dashboardRouter', 'bannerRouter']).config(['$httpProvider', '$urlRouterProvider', '$stateProvider', '$locationProvider', function($httpProvider, $urlRouterProvider, $stateProvider, $locationProvider) {

    //Setting HTML5 Location Mode
    $locationProvider.html5Mode({
      enabled: true
    });

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
            }
        }).
        state('adminLayout', {
            abstract: true,
            views: {
                'layout': {
                    templateUrl: 'views/layouts/admin.html'
                },
                'header@adminLayout': {
                    templateUrl: 'views/elements/header.html',
                    controller: 'HeaderController'
                },
                'footer@adminLayout': {
                    templateUrl: 'views/elements/footer.html',
                    controller: 'FooterController'
                },
                'alert@adminLayout': {
                    templateUrl: 'views/layouts/alert.html',
                    controller: 'AlertController'
                }
            }
            /*resolve: {
                data: function($q, $location, $timeout, Authentication) {
                    var deferred = $q.defer();
                    if( Authentication.isLoggedIn() ) {
                        deferred.resolve();
                    } else {
                        $timeout(function() {
                            $location.path('/login');
                        }, 200);
                        deferred.reject();
                    }
                    return deferred.promise;
                }
            }*/
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
            /*resolve: {
                data: function($q, $location, $timeout, Authentication) {
                    var deferred = $q.defer();
                    if( Authentication.isLoggedIn() ) {
                        $timeout(function() {
                            $location.path('/dashboard');
                        }, 200);
                        deferred.reject();
                    } else {
                        deferred.resolve();
                    }
                    return deferred.promise;
                }
            }*/
        });

}]);