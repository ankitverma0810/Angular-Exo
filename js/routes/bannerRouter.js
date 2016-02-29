angular.module('bannerRouter', []).
    config(['$stateProvider', function($stateProvider) {
    	$stateProvider.
	        state('banners', {
	            url: '/banners',
	            templateUrl: 'views/banners/index.html',
	            controller: 'BannerController',
	            parent: 'defaultLayout',
	            resolve: {
	                Banners: ['$http', 'myConfig', function($http, myConfig) {
	                    return $http.get(myConfig.URL+myConfig.API+'/banners').then(function(response) {
	                        return response.data;
	                    });
	                }]
	            }
	        }).
	        state('banners/add', {
	            url: '/banners/add',
	            templateUrl: 'views/banners/add.html',
	            controller: 'BannerController',
	            parent: 'defaultLayout',
	            resolve: {
	            	Banners: function() {
	            		return {};
	            	}
	            }
	        });
}]);