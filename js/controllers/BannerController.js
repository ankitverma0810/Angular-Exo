myApp.controller('BannerController', ['$scope', '$http', '$state', 'Banners', 'alertsManager', 'myConfig', function($scope, $http, $state, Banners, alertsManager, myConfig) {

	$scope.url = myConfig.URL;
	$scope.banners = Banners;

	$scope.delete = function(idx) {
		var banner = $scope.banners[idx];
		$http.delete(myConfig.URL+myConfig.API+'/banners/delete/'+banner.Banner.id).then(function(response) {
			if(response.data.error) {
				alertsManager.addAlert(response.data.error, 'alert-danger');
			} else {
				$scope.banners.splice(idx, 1);
				alertsManager.addAlert(response.data.success, 'alert-success');
			}
		}, function(error) {
			console.log(error);
		});
	};
}]);