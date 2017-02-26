(function (){
	var CommonService = {
			sysCodes: new Array(),
			loggedInUser:{},
			init : function(restService){
				
				restService.invoke(REST_URLS.LOGGEDIN_USER,null, function(response, status, headers, config){
					CommonService.loggedInUser=response;
				}, function(response, status, headers, config){

				})
				restService.invoke(REST_URLS.SYSCODES,null, function(response, status, headers, config){
					CommonService.sysCodes=response;
				}, function(response, status, headers, config){

				})
			},
			getSysCodeByType: function(codeType){
				var sysCodesByType=new Array();
				for(var key in this.sysCodes){
					if(this.sysCodes[key].codeType===codeType){
						sysCodesByType.push(this.sysCodes[key]);
					}
				}
				return sysCodesByType;
			}
	}
	angular.module('otc.commonService',[]).provider('commonService',function CommonServiceProvider(){
		this.instance= CommonService,
		
		this.$get = ['$http','$rootScope','restService', function CommonServiceProvider($http, $rootScope,restService) {
			this.instance.$http=$http;
			this.instance.$rootScope=$rootScope;
			this.instance.contextPath=CONTEXT_PATH;
			this.instance.init(restService);
			window.$http = $http;
			return this.instance;
		}];	
	});
}());