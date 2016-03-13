myApp.factory('authHttpResponseInterceptor', ['$q', '$location', '$timeout', function($q, $location, $timeout) {
	return {
        response: function(response){
            if (response.status === 403) {
                console.log("Response 403");
            }
            return response || $q.when(response);
        },
        responseError: function(rejection) {
            if (rejection.status === 403) {
                $timeout(function() {
                    $location.path('/login');
                }, 200);
            }
            return $q.reject(rejection);
        }
    }
}]);