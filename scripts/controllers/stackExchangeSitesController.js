stackExchangeApplication.controller('stackExchangeSitesController', function ($scope, $rootScope, $location, $routeParams, dateFilter, sites, StackExchangeService) {

	$scope.sitesCollection = sites.items;
	$scope.siteCount = sites.total;
	$scope.pageSize = 25;
	$scope.noOfPages = calculatePageCount();
	$scope.currentPageNum = 1;


	$scope.loadDetailView = function (index) {
		$rootScope.currentSite = $scope.sitesCollection[index];
		console.dir($location);console.dir($routeParams);
		$location.path('/site/' + $scope.sitesCollection[index].api_site_parameter).replace();
	};

	$scope.pageSize_OnChange = function () {
		$scope.noOfPages = calculatePageCount();
		$scope.currentPageNum = 1;

	};

	$scope.$watch('currentPageNum', function (newValue, oldValue) {
		if (newValue !== oldValue) {


			if(!isNaN(newValue)){
				$location.path("/page/" + newValue);

			}
		}
	});

	$scope.$on("$routeChangeSuccess", function(event){
		var pageNum = +$routeParams.pageNum;

		if(pageNum && $scope.currentPageNum !== pageNum){
			$scope.currentPageNum = pageNum;

			StackExchangeService.getSites($scope.pageSize, $scope.currentPageNum).$then(function (response) {
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
