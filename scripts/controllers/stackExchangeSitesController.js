stackExchangeApplication.controller('stackExchangeSitesController', function ($scope, $rootScope, $location, dateFilter, sites, StackExchangeService) {

	$scope.sitesCollection = sites.items;
	$scope.siteCount = sites.total;
	$scope.pageSize = 25;
	$scope.noOfPages = calculatePageCount();
	$scope.currentPageNo = 1;

	$scope.loadDetailView = function (index) {
		$rootScope.currentSite = $scope.sitesCollection[index];
		$location.path('/site/' + $scope.sitesCollection[index].api_site_parameter);
	};

	$scope.pageSize_OnChange = function () {
		$scope.noOfPages = calculatePageCount();
		$scope.currentPageNo = 1;
		StackExchangeService.getSites($scope.pageSize, $scope.currentPageNo).$then(function (response) {
			$scope.sitesCollection = response.data.items;
		});
	};


	$scope.$watch('currentPageNo', function (newValue, oldValue) {
		if (newValue !== oldValue) {
			StackExchangeService.getSites($scope.pageSize, newValue).$then(function (response) {
				$scope.sitesCollection = response.data.items;
			});
		}
	});

	$scope.formatDate = function (ticks) {
		return (ticks) ? dateFilter(new Date(0).setUTCSeconds(ticks), 'M/d/yy h:mm:ss a') : '';
	};

	function calculatePageCount() {
		return (($scope.siteCount % $scope.pageSize) === 0) ? $scope.siteCount / $scope.pageSize : Math.floor($scope.siteCount / $scope.pageSize) + 1;
	}
});
