myApp.controller('BannerController', ['$scope', '$http', '$location', '$stateParams', 'alertsManager', 'myConfig', 'Authentication', function($scope, $http, $location, $stateParams, alertsManager, myConfig, Authentication) {

	// If user is not signed in then redirect back home
	if( !Authentication.isLoggedIn() ) $location.path('/login');

	$scope.url = myConfig.URL;

	$scope.listAll = function() {
		$http.get(myConfig.URL+myConfig.API+'/banners').then(function(response) {
            $scope.banners = response.data;
        });
	};

	$scope.add = function() {
		var formData = this.appendData($scope.banner);
		$http({
            url: myConfig.URL+myConfig.API+'/banners/add/',
            method: "POST",
            data: formData,
            headers: { 'Content-Type': undefined }
        }).success(function (response) {
        	alertsManager.addAlert(response.success, 'alert-success');
        	$location.path('/banners');
        });
	};

	$scope.update = function() {
		var formData = this.appendData($scope.banner);
		$http({
            url: myConfig.URL+myConfig.API+'/banners/edit/'+$stateParams.bannerId,
            method: "POST",
            data: formData,
            headers: { 'Content-Type': undefined }
        }).success(function (response) {
        	alertsManager.addAlert(response.success, 'alert-success');
        	$location.path('/banners');
        });
	};

	$scope.appendData = function(data) {
		var formData = new FormData();
		angular.forEach(data, function(value, key) {
			if( key === 'filename' && typeof(value) === 'object' ) {
				formData.append('filename', value);
			} else {
				if( key !== 'filename' ) {
					formData.append('Banner['+key+']', value);
				}
			}
		});
		return formData;
	};

	$scope.find = function() {
		$http.get(myConfig.URL+myConfig.API+'/banners/edit/'+$stateParams.bannerId).then(function(response) {
            $scope.banner = response.data.Banner;
        });
	};

	$scope.delete = function(idx) {
		var banner = $scope.banners[idx];
		$http.delete(myConfig.URL+myConfig.API+'/banners/delete/'+banner.Banner.id).then(function(response) {
			if(response.data.error) {
				alertsManager.addAlert(response.data.error, 'alert-danger');
				$location.path('/banners');
			} else {
				$scope.banners.splice(idx, 1);
				alertsManager.addAlert(response.data.success, 'alert-success');
				$location.path('/banners');
			}
		}, function(error) {
			console.log(error);
		});
	};
}]);