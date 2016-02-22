myApp.controller('DashboardController', ['$scope', '$rootScope', '$http', 'Configuration', function($scope, $rootScope, $http, Configuration) {

	$scope.config = Configuration.Detail;

	$scope.updateSettings = function(id) {
		$http.put('/exo-backend/admin/details/edit/'+id, $scope.config).then(function(response) {
			if(response.data.error) {
				$rootScope.setFlash = { type: 'danger', message: response.data.error };
			} else {
				$rootScope.setFlash = { type: 'success', message: response.data.success };
			}
		}, function(error) {
			console.log(error);
		});
	}	
}]);