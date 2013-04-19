stackExchangeApplication.controller('stackExchangeSiteDetailController', function ($scope, $rootScope, $routeParams, dateFilter, siteInfo, questions, StackExchangeService) {
    
    $scope.currentSiteInfo = siteInfo[0];
	$scope.siteName= $routeParams.siteName
	$scope.questions = questions;
	$scope.tags = [];


	$scope.formatDate = function (seconds) {
		return (seconds) ? dateFilter(new Date(0).setUTCSeconds(seconds), 'M/d/yy h:mm:ss a') : '';
	};

	$scope.addTag = function(tag){
		$scope.tags.push(tag);

		StackExchangeService.getSiteQuestions($routeParams.siteName, 'creation', 'desc', $scope.tags).$then(function(response){
			$scope.questions = response.data.items
		});

		console.log($scope.questions);
	}

});
