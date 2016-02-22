angular.module('dashboardRouter', []).
    config(['$stateProvider', function($stateProvider) {
    	$stateProvider.
	        state('dashboard', {
	            url: '/dashboard',
	            templateUrl: 'views/dashboard/config.html',
	            controller: 'DashboardController',
	            parent: 'defaultLayout',
	            resolve: {
	                Configuration: ['$http', function($http) {
	                    return $http.get('/exo-backend/admin/details/view/1').then(function(response) {
	                        return response.data;
	                    });
	                }]
	            }
	        });
}]);