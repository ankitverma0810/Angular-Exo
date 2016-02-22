myApp.controller('HeaderController', ['$scope', 'Authentication', function($scope, Authentication) {
	$scope.logout = function() {
		Authentication.logout();
	};
}]);