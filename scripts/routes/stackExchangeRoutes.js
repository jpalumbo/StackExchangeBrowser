"use strict";

stackExchangeApplication.config(['$routeProvider', function ($routeProvider) {

	$routeProvider.when('/', {
		reloadOnSearch: false,
		templateUrl: 'partials/sites.html',
		controller: 'stackExchangeSitesController',
		resolve: {
			sites: sitesResolver
		}
	});

	$routeProvider.when('/site/:siteName', {
		templateUrl: 'partials/site-detail.html',
		controller: 'stackExchangeSiteDetailController',
		resolve: {
			siteInfo: siteInformationResolver,
			questions: questionResolver
		}

	});

}]);