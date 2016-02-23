myApp.controller('AlertController', ['$scope', 'alertsManager', function($scope, alertsManager) {

	$scope.closeAlert = function(index) {
        alertsManager.closeAlert(index);
    };
}]);