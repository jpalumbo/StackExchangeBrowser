/* Services */
stackExchangeApplication.factory('StackExchangeService', function ($resource, $cacheFactory) {
    var apiLocation = 'https://api.stackexchange.com/2.1/',
        apiKey = 'U4DMV*8nvpm3EOpvf69Rxw((';
    // cache store 
    cache = $cacheFactory('StackExchangeService'),
    pageFilter = '!9hnGsxUjS',
    totalFilter = '!9hnGt)DrA',
    pageAndTotalFilter = '!-.mgWMrj9PVd',

	// sites resource definitions
    SitesResource = $resource(apiLocation + 'sites', { callback: 'JSON_CALLBACK' }, { query: { method: 'JSONP' } }),
    SiteInfoResource = $resource(apiLocation + 'info', { callback: 'JSON_CALLBACK' }, { query: { method: 'JSONP' } }),
    SiteQuestionsResource = $resource(apiLocation + 'questions', { callback: 'JSON_CALLBACK' }, { query: { method: 'JSONP' } });


	// service api
    return {
        getSites: function (pageSize, page, getPage, getTotal) {
            var sites, parameters, cacheKey = 'sites';
            parameters = { key: apiKey };

			if (pageSize) {
				parameters = angular.extend(parameters, { pagesize: pageSize });
				cacheKey += '_' + pageSize;
			}

			if (page) {
				parameters = angular.extend(parameters, { page: page });
				cacheKey += '_' + page;
			}

			if (getPage && !getTotal) {
				parameters = angular.extend(parameters, { filter: pageFilter });
				cacheKey += '_' + pageFilter;
			}

			if (getTotal && !getPage) {
				parameters = angular.extend(parameters, { filter: totalFilter });
				cacheKey += '_' + totalFilter;
			}

			if (getTotal && getPage) {
				parameters = angular.extend(parameters, { filter: pageAndTotalFilter });
				cacheKey += '_' + pageAndTotalFilter;
			}

			sites = cache.get(cacheKey);

            if (!sites) {
                sites = SitesResource.query(parameters);
                cache.put(cacheKey, sites);
            }

            return sites;
        },

        getSiteInfo: function (siteKey) {
			var cacheKey = 'siteInfo_' + siteKey, siteInfo = cache.get(cacheKey);

            if (!siteInfo) {
                siteInfo = SiteInfoResource.query({ site: siteKey, key: apiKey });
                cache.put(cacheKey, siteInfo);
            }

            return siteInfo;
        },

        getSiteQuestions: function (siteKey, sort, direction, tagged) {

			var questions, parameters, cacheKey = 'questions';
			parameters = { key: apiKey };

			if (siteKey) {
				parameters = angular.extend(parameters, { site: siteKey });
				cacheKey += '_' + siteKey;
			}

			if (sort) {
				parameters = angular.extend(parameters, { sort: sort });
				cacheKey += '_' + sort;
			}

			if (direction) {
				parameters = angular.extend(parameters, { order: direction });
				cacheKey += '_' + direction;
			}

			if (tagged) {
				var tagsList =  tagged.join(";");
				parameters = angular.extend(parameters, { tagged: tagsList });
				cacheKey += '_' + tagsList;
			}

			questions = cache.get(cacheKey);

			console.log(parameters);
			if (!questions) {
				questions = SiteQuestionsResource.query(parameters);
				cache.put(cacheKey, questions);
			}

			return questions;
        }
    }


});


