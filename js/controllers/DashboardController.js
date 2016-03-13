myApp.controller('DashboardController', ['$scope', '$http', '$location', 'alertsManager', 'myConfig', 'Authentication', function($scope, $http, $location, alertsManager, myConfig, Authentication) {

	// If user is not signed in then redirect back home
	if( !Authentication.isLoggedIn() ) $location.path('/login');

	$scope.listAll = function() {
		$http.get(myConfig.URL+myConfig.API+'/details/view/1').then(function(response) {
            $scope.config = response.data.Detail;
        });
	};

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