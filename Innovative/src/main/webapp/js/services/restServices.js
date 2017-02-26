var REST_URLS = {
	ITEMS: {url: '/rest/items',method:'GET', isArray:true},
	SIZE_OF_ITEM: {url: '/rest/item/{itemId}/state/{stateId}/sizes',method:'GET', isArray:true},
	ITEM_PRICING_BY_ITEM_ID: {url: '/rest/item/{itemId}/state/{stateId}',method:'GET', isArray:true},
	QUOTES: {url: '/rest/quotes',method:'GET', isArray:true},
	CREATE_QUOTE: {url: '/rest/quote/create',method:'POST', isArray:true},
	UPDATE_QUOTE: {url: '/rest/quote/update',method:'POST', isArray:true},
	LOGGEDIN_USER: {url: '/rest/loggedInUser',method:'GET', isArray:true},	
	REQUEST_EXTRA_DISCOUNT: {url: '/rest/quote/requestExtraDiscount',method:'POST', isArray:true},
	CONFIRM_ADVANCE_PAID: {url: '/rest/quote/{quoteId}/confirm',method:'POST', isArray:true},
	GET_QUOTE_BY_ID: {url: '/rest/quote/{quoteId}',method:'GET', isArray:true},
	GET_ITEMS_PRICING: {url: '/rest/items/pricing',method:'GET', isArray:true},
	SYSCODES:{url: '/rest/syscodes',method:'GET', isArray:true},
	CHANGE_ITEM_PRICE:{url: '/rest/item/price/change',method:'POST', isArray:true},
	DASHBOARD_ITEM:{url: '/rest/dashboardItem',method:'GET', isArray:true},
	FOLLOW_UP_QUOTE:{url: '/rest/quote/{quoteId}/followUp',method:'POST', isArray:true}
};

(function (){
	var RestService = {
			invoke:function(URLobj,scope,successCallback,errorCallback,pathParams,queryParams,data){
				var URLObjectClone={};
				angular.extend(URLObjectClone, URLobj);
				
				if(pathParams){
					for(var key in pathParams){
						URLObjectClone.url=URLObjectClone.url.replace("{"+key+"}",pathParams[key])
					}
				}
				var urlString = this.contextPath+URLObjectClone.url;
				if(queryParams){
						for(i=0;i<queryParams.length;i++){
							if(i==0){
								urlString = urlString + '?' + queryParams[i].name + "=" + queryParams[i].value;
							}else{
								urlString = urlString + '&' + queryParams[i].name + "=" + queryParams[i].value;
							}
						}
				}
				var successFunc = function(response, status, headers, config) {
						successCallback(response, status, headers, config,scope);
				};

				var errorFunc = function(response,status, headers, config) {
					if(status!=0){
						errorCallback(response,status, headers, config,scope);
					}
				};

				var httpURL;
				if(data == null){
					httpURL = {method: URLObjectClone.method, url: urlString,withCredentials: true,headers:URLObjectClone.headers,successHandle:successFunc,errorHandle:errorFunc} ;
				}else{
					httpURL = {method: URLObjectClone.method, url: urlString,data:data,withCredentials: true,headers:URLObjectClone.headers,successHandle:successFunc,errorHandle:errorFunc} ;
				}
				this.$http(httpURL).success(successFunc).error(errorFunc);
			}
	}
	angular.module('otc.restService',[]).provider('restService',function RestServiceProvider(){
		this.instance= RestService,
		this.$get = ['$http','$rootScope', function RestServiceProvider($http, $rootScope) {
			this.instance.$http=$http;
			this.instance.$rootScope=$rootScope;
			this.instance.contextPath=CONTEXT_PATH;
			window.$http = $http;
			return this.instance;
		}];	
	});
}());