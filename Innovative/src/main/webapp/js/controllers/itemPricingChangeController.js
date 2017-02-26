'use strict';
app.controller('itemPricingChangeController', ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes','restService','$timeout','commonService','toaster', function($scope, $filter, $http, editableOptions, editableThemes,restService,$timeout,commonService,toaster) {
	$scope.commonService=commonService;
	$scope.sysCodes=$scope.commonService.sysCodes;
	$scope.itemCategoryList=$scope.commonService.getSysCodeByType("ITEM_TYPE");
	$scope.stateDisabled=true;
	$scope.modularTypeDisabled=true;
	$scope.sizeDisabled=true;
	$scope.showState=function(item){
		if(item!=undefined){
			$scope.itemTypeId=item;
			$scope.stateDisabled=false;
			$scope.state="";
			$scope.itemPrices="";
		}else{
			$scope.stateDisabled=true;
			$scope.state="";
			$scope.itemPrices="";
		}
	}
	
	$scope.itemPrices='[{"engine": "Trident","browser": "Internet Explorer 4.0","platform": "Win 95+","version": "4","grade": "X"}]';
	$scope.showQuote=function(state){
		if($scope.itemTypeId=="10"){
			$scope.modularTypeDisabled=true;
			$scope.sizeDisabled=true;
		}else if($scope.itemTypeId!="30" || $scope.itemTypeId!="40" || $scope.itemTypeId!="70"){
			$scope.sizeDisabled=false;
			$scope.modularTypeDisabled=false;
		}else{
			$scope.sizeDisabled=true;
			$scope.modularTypeDisabled=false;
		}
		var queryParams=[{"name":"itemType","value":$scope.itemTypeId},{"name":"stateId","value":state}];
		 restService.invoke(REST_URLS.GET_ITEMS_PRICING,$scope,
	    		  function(response, status, headers, config,$scope){
	    	  		$scope.itemPrices=response;
	    	  		$timeout(function(){
	    	  			$scope.showGrid=response;
	    	  		}, 1000);
	      		  },function(response, status, headers, config,$scope){
	    	  
	      		},null,queryParams
	      );
	}
	
	$scope.updateItemPricing=function(){
		var itemPriceList=new Array();
		  $.each($scope.itemPrices, function(key,value) {
          var data={};
          data.id=value.id;
    	  data.itemId=value.itemId;
    	  data.size=value.size;
    	  data.dealerPrice=value.dealerPrice
    	  data.retailPrice=value.retailPrice;
    	  data.stateId=value.stateId;
    	  data.modularType=value.modularType;
    	  itemPriceList.push(data);
  		});
			 var data=JSON.stringify(itemPriceList);
			 restService.invoke(REST_URLS.CHANGE_ITEM_PRICE,$scope,
		   		  function(response, status, headers, config,$scope){
						 console.log(response);
						 if(response!=""){
							 toaster.pop("success", "Successfull", "Item price changed successfully");
						 }else{
							 toaster.pop("error", "Failed", "Operation failed");
						 }

		     		  },function(response, status, headers, config,$scope){

		     		},null,null,data
		     );
	}
	
}]);