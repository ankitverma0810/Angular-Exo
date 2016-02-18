myApp.factory('Authentication', ['$rootScope', '$location', '$http', '$sessionStorage', function($rootScope, $location, $http, $sessionStorage) {
	var authObject =  {
		init: function() {
			$rootScope.authUser = $sessionStorage.authUser;
			$rootScope.authToken = $sessionStorage.authToken;
		},		
		login: function(user) {
			$http.post('/exo-backend/admin/users/login', user).then(function(response) {
				if(response.data.error) {
					$rootScope.alertMessage = response.data.error;
				} else {
					authObject.setAuthData(response.data);
					$location.path('/');
				}
			}, function(error) {
				console.log(error);
			});
		},
		logout: function() {
			$http.get('/exo-backend/admin/users/logout').then(function(response) {
		        if(response.data.error) {
					$rootScope.alertMessage = response.data.error;
				} else {
					authObject.deleteAuthData();
					$location.path('/login');
				}
		    }, function(error) {
		    	console.log(error);
		    });
		},
		isLoggedIn: function() {
	    	return Boolean($sessionStorage.authToken);
	    },
		checkAuth: function(callback) {
			$http.get('/exo-backend/admin/users/login').then(function(response) {
				if(response.data.error) {
					if('error' in callback) callback.error(response.data);
				} else {
					$sessionStorage.authUser = response.data.user;
					$sessionStorage.authToken = response.data.token;
					if('success' in callback) callback.success(response.data);
				}
		    }, function(error) {
		    	console.log(error);
		    	if('error' in callback) callback.error(response.data);
		    });
		},
		register: function(user) {
			$http.post('/exo-backend/admin/users/add', user).then(function(response) {
				if(response.data.error) {
					$rootScope.alertMessage = response.data.error;
				} else {
					$rootScope.alertMessage = response.data.success;
					$location.path('/login');
				}
			}, function(error) {
				console.log(error);
			});
		},
		setAuthData: function(response) {
			$sessionStorage.authUser = response.user;
			$sessionStorage.authToken = response.token;
			$rootScope.authUser = response.user;
			$rootScope.authToken = response.token;
		},
		deleteAuthData: function() {
			delete $sessionStorage.authUser;
			delete $sessionStorage.authToken;
			$rootScope.authUser = undefined;
			$rootScope.authToken = undefined;
		}
	}
	authObject.init();

	return authObject;
}]);