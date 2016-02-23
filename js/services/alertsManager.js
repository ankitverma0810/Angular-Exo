myApp.factory('alertsManager', ['$rootScope', function($rootScope) {
    $rootScope.alerts = [];
    return {
        addAlert: function(message, type) {
            $rootScope.alerts.push({type: type, message: message});
        },
        closeAlert: function(index) {
          return $rootScope.alerts.splice(index, 1);
        },
        clearAlerts: function() {
            $rootScope.alerts = [];
        }
    };
}]);