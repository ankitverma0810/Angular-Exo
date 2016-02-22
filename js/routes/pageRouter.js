angular.module('pageRouter', []).
    config(['$stateProvider', function($stateProvider) {
    	$stateProvider.
	        state('home', {
	            url: '/',
	            templateUrl: 'views/pages/home.html',
	            controller: 'PagesController',
	            parent: 'defaultLayout'
	        });
}]);