myApp.factory('alertsManager', ['$rootScope', function($rootScope) {
    $rootScope.alerts = [];
    $rootScope.currentMessage = "";

    $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
        $rootScope.currentMessage = $rootScope.alerts.shift() || "";
    });

    return {
        addAlert: function(message, type) {
            $rootScope.alerts.push({type: type, message: message});
        }
        /*closeAlert: function(index) {
          return $rootScope.alerts.splice(index, 1);
        },
        clearAlerts: function() {
            $rootScope.alerts = [];
        }*/
    };
}]);