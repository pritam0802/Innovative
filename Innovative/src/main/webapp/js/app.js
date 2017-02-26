'use strict';


angular.module('app', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'ui.router',
    'ui.bootstrap',
    'ui.utils',
    'ui.load',
    'ui.jq',
    'oc.lazyLoad',
    'ui.select',
    'toaster',
    'otc.restService',
    'otc.commonService',
    'otc.directives',
    'pascalprecht.translate'
]).filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}]);

angular.module('app').config(function($stateProvider, $urlRouterProvider,JQ_CONFIG, MODULE_CONFIG){
	$urlRouterProvider.otherwise('/app/dashboard-v1');

	$stateProvider.
	
		state('app.dashboard-v1', {
	        url: '/dashboard-v1',
	        templateUrl: 'pages/app_dashboard_v1.jsp',
	        resolve: load(['js/controllers/chart.js'])
	    }).
		// Home
		state('app.createQuote', {
			url: '/createQuote',
			templateUrl: 'app/modules/quote/CreateQuote.jsp',
			controller: 'createQuoteController',
			resolve: load(['xeditable','js/controllers/xeditable.js','js/controllers/toaster.js'])
		}).state('app.existingQuotes', {
			url: '/existingQuotes',
			templateUrl: 'app/modules/quote/ExistingQuotes.jsp',
			controller: 'existingQuoteController',
			resolve: load(['xeditable','js/controllers/xeditable.js','js/controllers/toaster.js'])
		}).state('app.updateExistingQuotes', {
			url: '/quote/:quoteId',
			templateUrl: 'app/modules/quote/UpdateExistingQuote.jsp',
			controller: 'existingQuoteController',
			resolve: load(['xeditable','js/controllers/xeditable.js','js/controllers/toaster.js'])
		}).state('app.pricingChange', {
			url: '/itemPricingChange',
			templateUrl: 'app/modules/item/ItemPricingChange.jsp',
			controller: 'itemPricingChangeController',
			resolve: load(['xeditable','js/controllers/xeditable.js','js/controllers/toaster.js'])
		});
    function load(srcs, callback) {
        return {
            deps: ['$ocLazyLoad', '$q',
              function( $ocLazyLoad, $q ){
                var deferred = $q.defer();
                var promise  = false;
                srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                if(!promise){
                  promise = deferred.promise;
                }
                angular.forEach(srcs, function(src) {
                  promise = promise.then( function(){
                    if(JQ_CONFIG[src]){
                      return $ocLazyLoad.load(JQ_CONFIG[src]);
                    }
                    angular.forEach(MODULE_CONFIG, function(module) {
                      if( module.name == src){
                        name = module.name;
                      }else{
                        name = src;
                      }
                    });
                    return $ocLazyLoad.load(name);
                  } );
                });
                deferred.resolve();
                return callback ? promise.then(function(){ return callback(); }) : promise;
            }]
        }
      }
});
