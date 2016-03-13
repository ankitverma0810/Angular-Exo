angular.module('bannerRouter', []).
    config(['$stateProvider', function($stateProvider) {
    	$stateProvider.
	        state('banners', {
	            url: '/banners',
	            templateUrl: 'views/banners/index.html',
	            controller: 'BannerController',
	            parent: 'adminLayout'
	        }).
	        state('banners/add', {
	            url: '/banners/add',
	            templateUrl: 'views/banners/add.html',
	            controller: 'BannerController',
	            parent: 'adminLayout'
	        }).
	        state('banners/edit', {
	            url: '/banners/edit/:bannerId',
	            templateUrl: 'views/banners/edit.html',
	            controller: 'BannerController',
	            parent: 'adminLayout'
	        });
}]);