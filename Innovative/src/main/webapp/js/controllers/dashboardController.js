'use strict';
app.controller('dashboardController', ['$scope', '$filter', '$http','restService','$timeout','commonService', function($scope, $filter, $http,restService,$timeout,commonService) {
	
	$scope.data = 10;
	
	$scope.showData  = function(){		
		  restService.invoke(REST_URLS.DASHBOARD_ITEM,$scope,
	    		  function(response, status, headers, config,$scope){
	    	  		$scope.DashboardItems=response;	    	  		
	      		  },function(response, status, headers, config,$scope){
	    	  
	      		}
	      );
	  }
	$scope.showData();
	
	 $scope.closeAlert = function(index) {
	      $scope.alerts.splice(index, 1);
	    };
}]);/**
 * 
 */