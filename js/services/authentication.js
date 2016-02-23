myApp.factory('Authentication', ['$http', '$rootScope', '$location', '$sessionStorage', 'alertsManager', function($http, $rootScope, $location, $sessionStorage, alertsManager) {

	$rootScope.$storage = $sessionStorage;

	var authObject =  {
		init: function() {
			$rootScope.authUser = $rootScope.$storage.authUser;
			$rootScope.authToken = $rootScope.$storage.authToken;

			$rootScope.$watch('$storage.authUser', function() {
			    $rootScope.authUser = $rootScope.$storage.authUser;
			});

			$rootScope.$watch('$storage.authToken', function() {
			    $rootScope.authToken = $rootScope.$storage.authToken;
    			$http.defaults.headers.common['X-CSRF-Token'] = $rootScope.$storage.authToken;
			});
		},	
		login: function(user) {
			$http.post('/exo-backend/admin/users/login', user).then(function(response) {
				if(response.data.error) {
					alertsManager.addAlert(response.data.error, 'alert-danger');
				} else {
					$rootScope.$storage.authUser = response.data.user;
					$rootScope.$storage.authToken = response.data.token;
					$location.path('/dashboard');
				}
			}, function(error) {
				console.log(error);
			});
		},
		logout: function() {
			$http.get('/exo-backend/admin/users/logout').then(function(response) {
		        if(response.data.error) {
					alertsManager.addAlert(response.data.error, 'alert-danger');
				} else {
					$rootScope.$storage.$reset();
					$location.path('/login');
				}
		    }, function(error) {
		    	console.log(error);
		    });
		},
		isLoggedIn: function() {
	    	return Boolean($rootScope.$storage.authToken);
	    },
		checkAuth: function(callback) {
			$http.get('/exo-backend/admin/users/login').then(function(response) {
				if(response.data.error) {
					if('error' in callback) callback.error(response.data);
				} else {
					$rootScope.$storage.authUser = response.data.user;
					$rootScope.$storage.authToken = response.data.token;
					if('success' in callback) callback.success(response.data);
				}
		    }, function(error) {
		    	console.log(error);
		    	if('error' in callback) callback.error(response.data);
		    });
		},
		register: function(user) {
			$http.post('/exo-backend/admin/users/register', user).then(function(response) {
				if(response.data.error) {
					alertsManager.addAlert(response.data.error, 'alert-danger');
				} else {
					$rootScope.$storage.authUser = response.data.user;
					$rootScope.$storage.authToken = response.data.token;
					$location.path('/dashboard');
				}
			}, function(error) {
				console.log(error);
			});
		}
	}
	authObject.init();

	return authObject;
}]);