var sitesResolver = function ($q, $route, $timeout, $rootScope, StackExchangeService) {
	var deferred = $q.defer();

	var completedCallback = function (response) {
	    (angular.equals(response, [])) ? deferred.reject("No sites were found!") : deferred.resolve(response.data);
	};

	StackExchangeService.getSites(25, 1, true, true).$then(completedCallback);

	return deferred.promise;
};

var siteInformationResolver = function ($q, $route, $timeout, $rootScope, StackExchangeService) {
	var deferred = $q.defer();

	var completedCallback = function (response) {
		(angular.equals(response, [])) ? deferred.reject("Could not load site information") : deferred.resolve(response.data.items);
	};
    console.log($route.current.params.siteName);
	StackExchangeService.getSiteInfo($route.current.params.siteName).$then(completedCallback);

	return deferred.promise;
};

var questionResolver = function ($q, $route, $timeout, $rootScope, StackExchangeService) {
	var deferred = $q.defer();

	var completedCallback = function (response) {
		(angular.equals(response, [])) ? deferred.reject("Could not questions") : deferred.resolve(response.data.items);
	};

	StackExchangeService.getSiteQuestions($route.current.params.siteName, 'creation', 'desc').$then(completedCallback);

	return deferred.promise;
};

