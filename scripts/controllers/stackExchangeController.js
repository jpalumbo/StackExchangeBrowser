stackExchangeApplication.controller('stackExchangeBaseController',function($scope, $rootScope){
	$rootScope.$on("$routeChangeStart", function (event, next, current) {

		$scope.alertMessage = "Loading...";
		$scope.alertClass = "alert-success";
		$scope.alertIsVisible = true;
	});
	$rootScope.$on("$routeChangeSuccess", function (event, current, previous) {

		$scope.alertMessage = "Successfully changed routes :)";
		$scope.alertIsVisible = false;

	});
	$rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
		alert("ROUTE CHANGE ERROR: " + rejection);

		$scope.alertMessage = "Failed to load the page";
		$scope.alertClass = "alert-error";
	});

});
