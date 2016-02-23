myApp.controller('DashboardController', ['$scope', '$rootScope', '$http', 'Configuration', 'alertsManager', function($scope, $rootScope, $http, Configuration, alertsManager) {

	$scope.config = Configuration.Detail;

	$scope.updateSettings = function(id) {
		$http.put('/exo-backend/admin/details/edit/'+id, $scope.config).then(function(response) {
			if(response.data.error) {
				alertsManager.addAlert(response.data.error, 'alert-danger');
			} else {
				alertsManager.addAlert(response.data.success, 'alert-success');
			}
		}, function(error) {
			console.log(error);
		});
	}	
}]);