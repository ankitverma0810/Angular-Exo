angular.module('dashboardRouter', []).
    config(['$stateProvider', function($stateProvider) {
    	$stateProvider.
	        state('dashboard', {
	            url: '/dashboard',
	            templateUrl: 'views/dashboard/config.html',
	            controller: 'DashboardController',
	            parent: 'adminLayout'
	        });
}]);