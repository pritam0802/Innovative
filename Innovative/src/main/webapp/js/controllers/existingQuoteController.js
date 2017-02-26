'use strict';
app.controller('existingQuoteController', ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes','restService','$rootScope','$state','$stateParams','toaster','$window','$timeout', function($scope, $filter, $http, editableOptions, editableThemes,restService,$rootScope,$state,$stateParams,toaster,$window,$timeout) {
	var quoteId=$stateParams.quoteId;
	$scope.sizeDisabled=true;
    $scope.quoteNameDisabled=true;
    $scope.modularTypeDisabled=true;
	$scope.carcases=[];
    $scope.necessaryAccessories=[];
    $scope.addOnAccessories=[];
    $scope.hardwares=[];
    $scope.shutters=[];
    $scope.profileGlassShutters=[];
    $scope.shelves=[];
    $scope.carcasesTotalAmount=0;
    $scope.accessoryTotalAmount=0;
    $scope.addOnAccessoryTotalAmount=0;
    $scope.hardwareTotalAmount=0;
    $scope.shutterTotalAmount=0;
    $scope.profileGlassShutterTotalAmount=0;
    $scope.shelveTotalAmount=0;
    
    /*Show quote*/
	$scope.showQuote=function(item){
		//toastr.error("Max available Quantity is: ", "Error", $scope.opts);
		//toaster.pop("success", "Title", "Successfully deleted");
		if(item!=null){
			bootbox.confirm("Changing state will remove quote..Continue(Y/N).?", function (result) {
				 if(result===true){
						$scope.carcases=[];
					    $scope.necessaryAccessories=[];
					    $scope.addOnAccessories=[];
					    $scope.hardwares=[];
					    $scope.shutters=[];
					    $scope.profileGlassShutters=[];
					    $scope.shelves=[];
					    $scope.quoteNameDisabled=false;
					    $scope.sizeDisabled=true;
					    $scope.carcasesTotalAmount=0;
					    $scope.accessoryTotalAmount=0;
					    $scope.addOnAccessoryTotalAmount=0;
					    $scope.hardwareTotalAmount=0;
					    $scope.shutterTotalAmount=0;
					    $scope.profileGlassShutterTotalAmount=0;
					    $scope.shelveTotalAmount=0;
					    $scope.quote.quote.totalAmount=0;
						 $scope.quote.quote.discount=0;
						 $scope.quote.quote.discountedAmount=0;
					    toaster.pop("success", "Title", "Successfully removed");
				 }else{
					 if(item=="1"){
						 $scope.state="2";
					 }else{
						 $scope.state="1";
					 }
				 }
			});
		}
	}
	
	$scope.showData  = function(){		
		  restService.invoke(REST_URLS.QUOTES,$scope,
	    		  function(response, status, headers, config,$scope){
	    	  		$scope.QuoteDatas=response;
	    	  		$timeout(function(){
	    	  			$scope.showGrid=response;
	    	  		}, 100);
	      		  },function(response, status, headers, config,$scope){
	    	  
	      		}
	      );
	  }
	$scope.showData();
	$scope.updateQuoteId = function(id){
		$scope.quoteId = id;
	}
	
	 $scope.CreateExtraDiscount= function(){
		 var extraDiscount={};
		 extraDiscount.quoteId=$scope.quoteId;
		 extraDiscount.amount=$scope.extraDiscount;
		 var data=JSON.stringify(extraDiscount)
    	  restService.invoke(REST_URLS.REQUEST_EXTRA_DISCOUNT,$scope,
              function(response, status, headers, config,$scope){
                      console.log(response);
                      if(response!=""){
                    	  $("#extraDiscountModal").modal("hide");
							 toaster.pop("success", "Successfull", "Request has been send successfully");
							 $timeout(function(){
								 $scope.showData();
				    	  		}, 1000);
						 }else{
							 toaster.pop("error", "Failed", "Operation failed");
						 }
                },function(response, status, headers, config,$scope){
      
                },null,null,data
             );   
		  }
	 $scope.ConfirmAdvancePaidAmount= function(){
		  var pathParams = {};
	      pathParams["quoteId"]=$scope.quoteId;
	      var queryParams=[{"name":"advancePaid","value":$scope.paidAmount}]; 	 	      
    	  restService.invoke(REST_URLS.CONFIRM_ADVANCE_PAID,$scope,
              function(response, status, headers, config,$scope){
                      console.log(response);	  					  
                      if(response!=""){
                    	  $("#advancePaidModal").modal("hide");
							 toaster.pop("success", "Successfull", "Quote has been confirmed successfully");
							 $timeout(function(){
								 $scope.showData();
				    	  		}, 1000);
						 }else{
							 toaster.pop("error", "Failed", "Operation failed");
						 }
                },function(response, status, headers, config,$scope){
      
                },pathParams,queryParams
             );   
		  }
	
	 
	 $scope.followUpQuote= function(){
		  var pathParams = {};
	      pathParams["quoteId"]=$scope.quoteId;
	      var queryParams=[/*{"name":"followupDate","value":$scope.dt},*/
	                       {"name":"comment","value":$scope.followUpComment}]; 	      
   	  restService.invoke(REST_URLS.FOLLOW_UP_QUOTE,$scope,
             function(response, status, headers, config,$scope){
                     console.log(response);	  					  
                     $scope.showData()
               },function(response, status, headers, config,$scope){
     
               },pathParams,queryParams
            );   
		  }
	
	/*remove row*/
    $scope.removeCarcaseRow = function(index) {
      $scope.carcases.splice(index, 1);
      var totalAmount=0;
		 $.each($scope.carcases, function(key,value) {
         			totalAmount+=value.selectedCarcasePrice;
 		});
		 $scope.carcasesTotalAmount=totalAmount;
		 $scope.quote.quote.totalAmount=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
		 if($scope.quote.quote.totalAmount<100000){
			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.05;
		 }else if($scope.quote.quote.totalAmount>100000 && $scope.quote.quote.totalAmount<200000){
			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.07;
		 }else if($scope.quote.quote.totalAmount>200000){
			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.10;
		 }
	 	 $scope.quote.quote.discountedAmount=$scope.quote.quote.totalAmount-$scope.quote.quote.discount;
    };
 /*add row*/
    $scope.addCarcaseRow = function() {
    		 $scope.inserted = {
		        id: $scope.carcases.length+1,
		        selectedCarcaseName: '',
		        selectedCarcaseSize: null,
		        selectedCarcaseModularType: null,
		        selectedRetailPrice: null, 
		        selectedCarcaseQuantity: null,
		        selectedCarcasePrice: null 
    		};
      $scope.carcases.push($scope.inserted);
    };
	/*Show carecase*/
	$scope.showCarcaseData  = function(){
		var queryParams=[{"name":"itemType","value":SysCodeTypeConstants.CARCASE}];
		  restService.invoke(REST_URLS.ITEMS,$scope,
	    		  function(response, status, headers, config,$scope){
	    	  		$scope.items=response;
	      		  },function(response, status, headers, config,$scope){
	    	  
	      		},null,queryParams
	      );
	  }
	$scope.showCarcaseData();
	/*Show size*/	
	$scope.showSize=function(item,index,isValid){
		$scope.carcaseName=item;
		var pathParams={};
		 pathParams["itemId"]=item.id;
		 pathParams["stateId"]=$scope.state;
		  restService.invoke(REST_URLS.SIZE_OF_ITEM,$scope,
	         function(response, status, headers, config,$scope){
	               // $scope.sizes = response[item.id];
	                $scope.sizeDisabled=false;
	                $.each($scope.carcases, function(key,value) {
	                	if(key==index){
	                		if(item.itemName=="Base Unit Regular"){
	                			value.selectedCarcaseModularType="10";
	                			$scope.modularTypeDisabled=true;
	          	           	}else{
	          	           		$scope.modularTypeDisabled=false;
	          	           	}
	                		$scope.carcaseSize=value.selectedCarcaseSize;
	                		value.selectedCarcaseName=item;
	                		value.sizes=response[item.id];
	                		if(isValid){
	                			if(item.itemName!="Base Unit Regular"){
	                				value.selectedCarcaseModularType=null;
	                			}
	                			value.selectedCarcaseSize=null;
		                		value.selectedRetailPrice=null;
		                		value.selectedCarcaseQuantity=0;
		                		value.selectedCarcasePrice=0;
		                		$scope.carcasesTotalAmount=0;
		                		$scope.quote.quote.totalAmount=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
		                		if($scope.quote.quote.totalAmount<100000){
		               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.05;
			               		 }else if($scope.quote.quote.totalAmount>100000 && $scope.quote.quote.totalAmount<200000){
			               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.07;
			               		 }else if($scope.quote.quote.totalAmount>200000){
			               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.10;
			               		 }
		           			 	$scope.quote.quote.discountedAmount=$scope.quote.quote.totalAmount-$scope.quote.quote.discount;
	                		}
	                		
	                	}
	        		});
	           },function(response, status, headers, config,$scope){
	 
	           },pathParams
	       );
	}
	
	/*Show modular*/
	$scope.showModular=function(item,index,isValid){
		if(item!=null){
			$scope.carcaseSize=item;
			//$scope.modularTypeDisabled=false;
			 $.each($scope.carcases, function(key,value) {
                	if(key==index){
                		value.selectedCarcaseSize=item;
                		if($scope.carcaseName.itemName=="Base Unit Regular"){
                			$scope.modularTypeDisabled=true;
                		}else{
                			$scope.modularTypeDisabled=false;
                		}
                		if(isValid){
                			if($scope.carcaseName.itemName!="Base Unit Regular"){
                				value.selectedCarcaseModularType=null;
                				value.selectedRetailPrice=null;
                			}
	                		value.selectedCarcaseQuantity=0;
	                		value.selectedCarcasePrice=0;
	                		$scope.carcasesTotalAmount=0;
	                		$scope.quote.quote.totalAmount=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
	                		if($scope.quote.quote.totalAmount<100000){
	               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.05;
		               		 }else if($scope.quote.quote.totalAmount>100000 && $scope.quote.quote.totalAmount<200000){
		               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.07;
		               		 }else if($scope.quote.quote.totalAmount>200000){
		               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.10;
		               		 }
	           			 	$scope.quote.quote.discountedAmount=$scope.quote.quote.totalAmount-$scope.quote.quote.discount;
                		}
                	}
        		});
			 if($scope.carcaseName.itemName=="Base Unit Regular"){
				 var pathParams={};
				 pathParams["itemId"]=$scope.carcaseName.id;
				 pathParams["stateId"]=$scope.state;
				 
				 var queryParams=[{"name":"size","value":$scope.carcaseSize},{"name":"modularType","value":10}];
				  restService.invoke(REST_URLS.ITEM_PRICING_BY_ITEM_ID,$scope,
			         function(response, status, headers, config,$scope){
			                //$scope.carcaseRate = response;
			                $.each($scope.carcases, function(key,value) {
			                	if(key==index){
			                		value.selectedCarcaseModularType="10";
			                		if(response==""){
			                			value.selectedRetailPrice="";
			                		}else{
			                			value.selectedRetailPrice=response[0].retailPrice;
			                		}
			                	}
			        		});
			           },function(response, status, headers, config,$scope){
			 
			           },pathParams,queryParams
			       );
			 }
		}
	}
	
	/*Show Item price by item id	*/
	$scope.showRate=function(item,index){
		var pathParams={};
		 pathParams["itemId"]=$scope.carcaseName.id;
		 pathParams["stateId"]=$scope.state;
		 
		 var queryParams=[{"name":"size","value":$scope.carcaseSize},{"name":"modularType","value":item}];
		  restService.invoke(REST_URLS.ITEM_PRICING_BY_ITEM_ID,$scope,
	         function(response, status, headers, config,$scope){
	                //$scope.carcaseRate = response;
	                $.each($scope.carcases, function(key,value) {
	                	if(key==index){
	                		value.selectedCarcaseModularType=item;
	                		if(response==""){
	                			value.selectedRetailPrice="";
	                		}else{
	                			value.selectedRetailPrice=response[0].retailPrice;
	                		}
	                		value.selectedCarcaseQuantity=0;
	                		value.selectedCarcasePrice=0;
	                		$scope.carcasesTotalAmount=0;
	                		$scope.quote.quote.totalAmount=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
	                		if($scope.quote.quote.totalAmount<100000){
	               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.05;
		               		 }else if($scope.quote.quote.totalAmount>100000 && $scope.quote.quote.totalAmount<200000){
		               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.07;
		               		 }else if($scope.quote.quote.totalAmount>200000){
		               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.10;
		               		 }
	           			 	$scope.quote.quote.discountedAmount=$scope.quote.quote.totalAmount-$scope.quote.quote.discount;
	                	}
	        		});
	           },function(response, status, headers, config,$scope){
	 
	           },pathParams,queryParams
	       );
	}
	/*Calculate total amount*/
	$scope.calculateTotalAmount=function(carcaseQuantity,index){
		var totalAmount=0;
			 $.each($scope.carcases, function(key,value) {
                	if(key==index){
                		if(carcaseQuantity!=""){
                			value.selectedCarcaseQuantity=carcaseQuantity;
                			value.selectedCarcasePrice=value.selectedRetailPrice*carcaseQuantity;
                		}else{
                			value.selectedCarcaseQuantity="";
                			value.selectedCarcasePrice="";
                		}
                	}
                	totalAmount+=value.selectedCarcasePrice;
        		});
			 $scope.carcasesTotalAmount=totalAmount;
			 $scope.quote.quote.totalAmount=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
			 if($scope.quote.quote.totalAmount<100000){
				 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.05;
			 }else if($scope.quote.quote.totalAmount>100000 && $scope.quote.quote.totalAmount<200000){
				 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.07;
			 }else if($scope.quote.quote.totalAmount>200000){
				 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.10;
			 }
			 $scope.quote.quote.discountedAmount=$scope.quote.quote.totalAmount-$scope.quote.quote.discount;
	}
	
	/*-------------------- ------
	Necessary Accessories table
	----------------------------*/
		/*remove row*/
	    $scope.removeNeceryAccessorieRow = function(index) {
	      $scope.necessaryAccessories.splice(index, 1);
	      var totalAmount=0;
			 $.each($scope.necessaryAccessories, function(key,value) {
	         			totalAmount+=value.selectedNeceryAccessoriePrice;
	 		});
			 $scope.accessoryTotalAmount=totalAmount;
			 $scope.quote.quote.totalAmount=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
			 if($scope.quote.quote.totalAmount<100000){
				 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.05;
			 }else if($scope.quote.quote.totalAmount>100000 && $scope.quote.quote.totalAmount<200000){
				 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.07;
			 }else if($scope.quote.quote.totalAmount>200000){
				 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.10;
			 }
		 	 $scope.quote.quote.discountedAmount=$scope.quote.quote.totalAmount-$scope.quote.quote.discount;
	    };
	 /*add row*/
	    $scope.addNecesryAccessorieRow = function() {
	    	if($scope.necessaryAccessories!=undefined){
	    		 $scope.inserted = {
			        id: $scope.necessaryAccessories.length+1,
			        selectedNeceryAccessorieName: '',
			        selectedNeceryAccessorieSize: null,
			        selectedNeceryAccessorieRetailPrice: null,
			        selectedNeceryAccessorieQuantity: null, 
			        selectedNeceryAccessoriePrice: null,
	    		};
	    	}else{
	    		$scope.inserted = {
	    				id: 1,
	    				selectedNeceryAccessorieName: '',
	 			        selectedNeceryAccessorieSize: null,
	 			        selectedNeceryAccessorieRetailPrice: null,
	 			        selectedNeceryAccessorieQuantity: null, 
	 			        selectedNeceryAccessoriePrice: null, 
				  };
	    	}
	      $scope.necessaryAccessories.push($scope.inserted);
	    };
	/*Show accessories*/
	$scope.showNecesryAccessoriesName  = function(){
		var queryParams=[{"name":"itemType","value":SysCodeTypeConstants.NECESSARY_ACCESSORIES}];
		  restService.invoke(REST_URLS.ITEMS,$scope,
	    		  function(response, status, headers, config,$scope){
	    	  		$scope.necesryAccessories=response;
	      		  },function(response, status, headers, config,$scope){
	    	  
	      		},null,queryParams
	      );
	  }
	$scope.showNecesryAccessoriesName();
	
	/*Show size*/	
	$scope.showNecesryAccessoriesSize=function(item,index,isValid){
		$scope.necesoryAccessoriesName=item;
		var pathParams={};
		 pathParams["itemId"]=item.id;
		 pathParams["stateId"]=$scope.state;
		  restService.invoke(REST_URLS.SIZE_OF_ITEM,$scope,
	         function(response, status, headers, config,$scope){
	                $scope.sizeDisabled=false;
	                $.each($scope.necessaryAccessories, function(key,value) {
	                	if(key==index){
	                		value.selectedNeceryAccessorieName=item;
	                		value.sizes=response[item.id];
	                		if(isValid){
	                			value.selectedNeceryAccessorieSize=null;
		                		value.selectedNeceryAccessorieRetailPrice=null;
		                		value.selectedNeceryAccessorieQuantity=0;
		                		value.selectedNeceryAccessoriePrice=0;
		                		$scope.accessoryTotalAmount=0;
		                		$scope.quote.quote.totalAmount=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
		                		if($scope.quote.quote.totalAmount<100000){
		               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.05;
		               		 }else if($scope.quote.quote.totalAmount>100000 && $scope.quote.quote.totalAmount<200000){
		               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.07;
		               		 }else if($scope.quote.quote.totalAmount>200000){
		               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.10;
		               		 }
		           			 	$scope.quote.quote.discountedAmount=$scope.quote.quote.totalAmount-$scope.quote.quote.discount;
	                		}
	                	}
	        		});
	           },function(response, status, headers, config,$scope){
	 
	           },pathParams
	       );
	}
	/*Show Item price by item id	*/
	$scope.showNesesryAccessoryRate=function(item,index,isValid){
		var pathParams={};
		 pathParams["itemId"]=$scope.necesoryAccessoriesName.id;
		 pathParams["stateId"]=$scope.state;
		 
		 var queryParams=[{"name":"size","value":item}];
		  restService.invoke(REST_URLS.ITEM_PRICING_BY_ITEM_ID,$scope,
	         function(response, status, headers, config,$scope){
	                //$scope.carcaseRate = response;
	                $.each($scope.necessaryAccessories, function(key,value) {
	                	if(key==index){
	                		value.selectedNeceryAccessorieSize=item;
	                		if(response==""){
	                			value.selectedNeceryAccessorieRetailPrice="";
	                		}else{
	                			value.selectedNeceryAccessorieRetailPrice=response[0].retailPrice;
	                		}
	                		if(isValid){
		                		value.selectedNeceryAccessorieQuantity=0;
		                		value.selectedNeceryAccessoriePrice=0;
		                		$scope.accessoryTotalAmount=0;
		                		$scope.quote.quote.totalAmount=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
		                		if($scope.quote.quote.totalAmount<100000){
		               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.05;
		               		 }else if($scope.quote.quote.totalAmount>100000 && $scope.quote.quote.totalAmount<200000){
		               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.07;
		               		 }else if($scope.quote.quote.totalAmount>200000){
		               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.10;
		               		 }
		           			 	$scope.quote.quote.discountedAmount=$scope.quote.quote.totalAmount-$scope.quote.quote.discount;
	                		}
	                	}
	        		});
	           },function(response, status, headers, config,$scope){
	 
	           },pathParams,queryParams
	       );
	}
	
	/*Calculate total amount*/
	$scope.calculateNesesryAssessorTotalAmount=function(item,index){
		var totalAmount=0;
			 $.each($scope.necessaryAccessories, function(key,value) {
                	if(key==index){
                		if(item!=""){
                			value.selectedNeceryAccessorieQuantity=item;
                			value.selectedNeceryAccessoriePrice=value.selectedNeceryAccessorieRetailPrice*item;
                		}else{
                			value.selectedNeceryAccessorieQuantity="";
                			value.selectedNeceryAccessoriePrice="";
                		}
                	}
                	totalAmount+=value.selectedNeceryAccessoriePrice;
        		});
			 $scope.accessoryTotalAmount=totalAmount;
			 $scope.quote.quote.totalAmount=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
			 if($scope.quote.quote.totalAmount<100000){
				 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.05;
			 }else if($scope.quote.quote.totalAmount>100000 && $scope.quote.quote.totalAmount<200000){
				 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.07;
			 }else if($scope.quote.quote.totalAmount>200000){
				 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.10;
			 }
			 $scope.quote.quote.discountedAmount=$scope.quote.quote.totalAmount-$scope.quote.quote.discount;
	}
	
	/*-------------------- ------
	Add-On Accessories table
	----------------------------*/
			/*remove row*/
		    $scope.removeAddOnAccessorieRow = function(index) {
		      $scope.addOnAccessories.splice(index, 1);
		      var totalAmount=0;
				 $.each($scope.addOnAccessories, function(key,value) {
		         			totalAmount+=value.selectedAddOnAccessoriePrice;
		 		});
				 $scope.addOnAccessoryTotalAmount=totalAmount;
				 $scope.quote.quote.totalAmount=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
				 if($scope.quote.quote.totalAmount<100000){
					 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.05;
				 }else if($scope.quote.quote.totalAmount>100000 && $scope.quote.quote.totalAmount<200000){
					 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.07;
				 }else if($scope.quote.quote.totalAmount>200000){
					 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.10;
				 }
			 	 $scope.quote.quote.discountedAmount=$scope.quote.quote.totalAmount-$scope.quote.quote.discount;
		    };
		 /*add row*/
		    $scope.addAddOnAccessorieRow = function() {
		    	if($scope.addOnAccessories!=undefined){
		    		 $scope.inserted = {
				        id: $scope.addOnAccessories.length+1,
				        selectedAddOnAccessorieName: '',
				        selectedAddOnAccessorieRetailPrice: null,
				        selectedAddOnAccessorieQuantity: null,
				        selectedAddOnAccessoriePrice: null, 
		    		};
		    	}else{
		    		$scope.inserted = {
		    				id: 1,
		    				selectedAddOnAccessorieName: '',
					        selectedAddOnAccessorieRetailPrice: null,
					        selectedAddOnAccessorieQuantity: null,
					        selectedAddOnAccessoriePrice: null,
					  };
		    	}
		      $scope.addOnAccessories.push($scope.inserted);
		    };
		/*Show AddOn accessories*/
		$scope.showAddOnAccessoriesName  = function(){
			var queryParams=[{"name":"itemType","value":SysCodeTypeConstants.ADDON_ACCESSORIES}];
			  restService.invoke(REST_URLS.ITEMS,$scope,
		    		  function(response, status, headers, config,$scope){
		    	  		$scope.addOnAccesris=response;
		      		  },function(response, status, headers, config,$scope){
		    	  
		      		},null,queryParams
		      );
		  }
		$scope.showAddOnAccessoriesName();
		
		/*Show Item price by item id	*/
		$scope.showAddOnAccessoryRate=function(item,index,isValid){
			var pathParams={};
			 pathParams["itemId"]=item.id;
			 pathParams["stateId"]=$scope.state;
			 
			  restService.invoke(REST_URLS.ITEM_PRICING_BY_ITEM_ID,$scope,
		         function(response, status, headers, config,$scope){
		                //$scope.carcaseRate = response;
		                $.each($scope.addOnAccessories, function(key,value) {
		                	if(key==index){
		                		value.selectedAddOnAccessorieName=item;
		                		if(response==""){
		                			value.selectedAddOnAccessorieRetailPrice="";
		                		}else{
		                			value.selectedAddOnAccessorieRetailPrice=response[0].retailPrice;
		                		}
		                		if(isValid){
			                		value.selectedAddOnAccessorieQuantity=0;
			                		value.selectedAddOnAccessoriePrice=0;
			                		$scope.addOnAccessoryTotalAmount=0;
			                		$scope.quote.quote.totalAmount=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
			                		if($scope.quote.quote.totalAmount<100000){
			               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.05;
			               		 }else if($scope.quote.quote.totalAmount>100000 && $scope.quote.quote.totalAmount<200000){
			               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.07;
			               		 }else if($scope.quote.quote.totalAmount>200000){
			               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.10;
			               		 }
			           			 	$scope.quote.quote.discountedAmount=$scope.quote.quote.totalAmount-$scope.quote.quote.discount;
		                		}
		                	}
		        		});
		           },function(response, status, headers, config,$scope){
		 
		           },pathParams
		       );
		}
		
		
		/*Calculate total amount*/
		$scope.calculateAddOnAssessorTotalAmount=function(item,index){
			var totalAmount=0;
				 $.each($scope.addOnAccessories, function(key,value) {
	                	if(key==index){
	                		if(item!=""){
	                			value.selectedAddOnAccessorieQuantity=item;
	                			value.selectedAddOnAccessoriePrice=value.selectedAddOnAccessorieRetailPrice*item;
	                		}else{
	                			value.selectedAddOnAccessorieQuantity="";
	                			value.selectedAddOnAccessoriePrice="";
	                		}
	                	}
	                	totalAmount+=value.selectedAddOnAccessoriePrice;
	        		});
				 $scope.addOnAccessoryTotalAmount=totalAmount;
				 $scope.quote.quote.totalAmount=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
				 if($scope.quote.quote.totalAmount<100000){
					 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.05;
				 }else if($scope.quote.quote.totalAmount>100000 && $scope.quote.quote.totalAmount<200000){
					 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.07;
				 }else if($scope.quote.quote.totalAmount>200000){
					 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.10;
				 }
				 $scope.quote.quote.discountedAmount=$scope.quote.quote.totalAmount-$scope.quote.quote.discount;
		}
		
		/*-------------------- 
		Hardware table
		-------------------*/
		 /*remove row*/
	    $scope.removeHardwareRow = function(index) {
	      $scope.hardwares.splice(index, 1);
	      var totalAmount=0;
			 $.each($scope.hardwares, function(key,value) {
             			totalAmount+=value.selectedHardwarePrice;
     		});
			 $scope.hardwareTotalAmount=totalAmount;
			 $scope.quote.quote.totalAmount=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
			 if($scope.quote.quote.totalAmount<100000){
				 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.05;
			 }else if($scope.quote.quote.totalAmount>100000 && $scope.quote.quote.totalAmount<200000){
				 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.07;
			 }else if($scope.quote.quote.totalAmount>200000){
				 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.10;
			 }
		 	 $scope.quote.quote.discountedAmount=$scope.quote.quote.totalAmount-$scope.quote.quote.discount;
	    };
	 /*add row*/
	    $scope.addHardwareRow = function() {
	    	if($scope.hardwares!=undefined){
	    		 $scope.inserted = {
			        id: $scope.hardwares.length+1,
			        selectedHardwareName: '',
			        selectedHardwareUnit: null,
			        selectedHardwareRetailPrice: null,
			        selectedHardwareQuantity: null, 
			        selectedHardwarePrice: null
	    		};
	    	}else{
	    		$scope.inserted = {
    				id: 1,
    				selectedHardwareName: '',
			        selectedHardwareUnit: null,
			        selectedHardwareRetailPrice: null,
			        selectedHardwareQuantity: null, 
			        selectedHardwarePrice: null   
    			  };
	    	}
	      $scope.hardwares.push($scope.inserted);
	    };
		/*Show hardware data*/
		$scope.showHardwareName  = function(){
			var queryParams=[{"name":"itemType","value":SysCodeTypeConstants.HARDWARE}];
			  restService.invoke(REST_URLS.ITEMS,$scope,
		    		  function(response, status, headers, config,$scope){
		    	  		$scope.hardwareData=response;
		      		  },function(response, status, headers, config,$scope){
		    	  
		      		},null,queryParams
		      );
		  }
		$scope.showHardwareName();
		/*Show Item price by item id	*/
		$scope.showHardwareRate=function(item,index,isValid){
			var pathParams={};
			 pathParams["itemId"]=item.id;
			 pathParams["stateId"]=$scope.state;
			 
			  restService.invoke(REST_URLS.ITEM_PRICING_BY_ITEM_ID,$scope,
		         function(response, status, headers, config,$scope){
		                //$scope.carcaseRate = response;
		                $.each($scope.hardwares, function(key,value) {
		                	if(key==index){
		                		value.selectedHardwareName=item;
		                		if(response==""){
		                			value.selectedHardwareRetailPrice="";
		                		}else{
		                			value.selectedHardwareRetailPrice=response[0].retailPrice;
		                		}
		                		if(isValid){
			                		value.selectedHardwareQuantity=0;
			                		value.selectedHardwarePrice=0;
			                		$scope.hardwareTotalAmount=0;
			                		$scope.quote.quote.totalAmount=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
			                		if($scope.quote.quote.totalAmount<100000){
			               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.05;
			               		 }else if($scope.quote.quote.totalAmount>100000 && $scope.quote.quote.totalAmount<200000){
			               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.07;
			               		 }else if($scope.quote.quote.totalAmount>200000){
			               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.10;
			               		 }
			           			 	$scope.quote.quote.discountedAmount=$scope.quote.quote.totalAmount-$scope.quote.quote.discount;
		                		}
		                	}
		        		});
		           },function(response, status, headers, config,$scope){
		 
		           },pathParams
		       );
		}
		/*Calculate total amount*/
		$scope.calculateHardwareTotalAmount=function(item,index){
			var totalAmount=0;
				 $.each($scope.hardwares, function(key,value) {
	                	if(key==index){
	                		if(item!=""){
	                			value.selectedHardwareQuantity=item;
	                			value.selectedHardwarePrice=value.selectedHardwareRetailPrice*item;
	                		}else{
	                			value.selectedHardwareQuantity="";
	                			value.selectedHardwarePrice="";
	                		}
	                	}
	                	totalAmount+=value.selectedHardwarePrice;
	        		});
				 $scope.hardwareTotalAmount=totalAmount;
				 $scope.quote.quote.totalAmount=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
				 if($scope.quote.quote.totalAmount<100000){
					 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.05;
				 }else if($scope.quote.quote.totalAmount>100000 && $scope.quote.quote.totalAmount<200000){
					 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.07;
				 }else if($scope.quote.quote.totalAmount>200000){
					 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.10;
				 }
				 $scope.quote.quote.discountedAmount=$scope.quote.quote.totalAmount-$scope.quote.quote.discount;
		}
		
		/*-------------------- 
		Shutter table
		-------------------*/
		/*remove row*/
	    $scope.removeShutterRow = function(index) {
	      $scope.shutters.splice(index, 1);
	      var totalAmount=0;
			 $.each($scope.shutters, function(key,value) {
             			totalAmount+=value.selectedShutterPrice;
     		});
			 $scope.shutterTotalAmount=totalAmount;
			 $scope.quote.quote.totalAmount=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
			 if($scope.quote.quote.totalAmount<100000){
				 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.05;
			 }else if($scope.quote.quote.totalAmount>100000 && $scope.quote.quote.totalAmount<200000){
				 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.07;
			 }else if($scope.quote.quote.totalAmount>200000){
				 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.10;
			 }
		 	 $scope.quote.quote.discountedAmount=$scope.quote.quote.totalAmount-$scope.quote.quote.discount;
	    };
	 /*add row*/
	    $scope.addShutterRow = function() {
	    	if($scope.shutters!=undefined){
	    		 $scope.inserted = {
			        id: $scope.shutters.length+1,
			        selectedLaminateType: '',
			        selectedShutterType: null,
			        selectedShutterRetailPrice: null,
			        selectedShutterWidth: null, 
			        selectedShutterPrice: null
	    		};
	    	}else{
	    		$scope.inserted = {
    				id: 1,
    				selectedLaminateType: '',
			        selectedShutterType: null,
			        selectedShutterRetailPrice: null,
			        selectedShutterWidth: null, 
			        selectedShutterPrice: null   
    			  };
	    	}
	      $scope.shutters.push($scope.inserted);
	    };
	    
	/*Show shutter data*/
	$scope.showShutterName  = function(){
		var queryParams=[{"name":"itemType","value":SysCodeTypeConstants.SHUTTER}];
		  restService.invoke(REST_URLS.ITEMS,$scope,
	    		  function(response, status, headers, config,$scope){
	    	  		$scope.shutterData=response;
	      		  },function(response, status, headers, config,$scope){
	    	  
	      		},null,queryParams
	      );
	  }
	$scope.showShutterName();
	
	
		/*Show Item price by item id	*/
		$scope.showShutterRate=function(item,index,isValid){
			var pathParams={};
			 pathParams["itemId"]=item.id;
			 pathParams["stateId"]=$scope.state;
			 
			  restService.invoke(REST_URLS.ITEM_PRICING_BY_ITEM_ID,$scope,
		         function(response, status, headers, config,$scope){
		                //$scope.carcaseRate = response;
		                $.each($scope.shutters, function(key,value) {
		                	if(key==index){
		                		value.selectedLaminateType=item;
		                		if(response==""){
		                			value.selectedShutterRetailPrice="";
		                		}else{
		                			value.selectedShutterRetailPrice=response[0].retailPrice;
		                		}
		                		if(isValid){
		                			value.selectedShutterType=null;
			                		value.selectedShutterWidth=0;
			                		value.selectedShutterPrice=0;
			                		$scope.shutterTotalAmount=0;
			                		$scope.quote.quote.totalAmount=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
			                		if($scope.quote.quote.totalAmount<100000){
			               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.05;
			               		 }else if($scope.quote.quote.totalAmount>100000 && $scope.quote.quote.totalAmount<200000){
			               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.07;
			               		 }else if($scope.quote.quote.totalAmount>200000){
			               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.10;
			               		 }
			           			 	$scope.quote.quote.discountedAmount=$scope.quote.quote.totalAmount-$scope.quote.quote.discount;
		                		}
		                	}
		        		});
		           },function(response, status, headers, config,$scope){
		 
		           },pathParams
		       );
		}
		$scope.updateShutterType=function(item,index){
			   $.each($scope.shutters, function(key,value) {
               	if(key==index){
               		value.selectedShutterType=item;
                		value.selectedShutterWidth=0;
                		value.selectedShutterPrice=0;
                		$scope.shutterTotalAmount=0;
                		$scope.quote.quote.totalAmount=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
                		if($scope.quote.quote.totalAmount<100000){
               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.05;
               		 }else if($scope.quote.quote.totalAmount>100000 && $scope.quote.quote.totalAmount<200000){
               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.07;
               		 }else if($scope.quote.quote.totalAmount>200000){
               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.10;
               		 }
           			 	$scope.quote.quote.discountedAmount=$scope.quote.quote.totalAmount-$scope.quote.quote.discount;
               	}
       		});
		}
	/*Calculate total amount*/
	$scope.calculateShutterTotalAmount=function(item,index){
		var totalAmount=0;
			 $.each($scope.shutters, function(key,value) {
                	if(key==index){
                		if(value.selectedShutterType=="Tall Cabinet Shutter"){
                			if(item!=""){
                    			value.selectedShutterWidth=item;
                    			var shutterPrice=((value.selectedShutterWidth*2000)/90000)*value.selectedShutterRetailPrice;
                    			value.selectedShutterPrice=shutterPrice/*value.selectedShutterRetailPrice*item*/;
                    		}else{
                    			value.selectedShelvesWidth=0;
                    			value.selectedShutterPrice=0;
                    		}
                		}else if(value.selectedShutterType=="Base Cabinet Shutter" || value.selectedShutterType=="Wall Cabinet Shutter"){
                			if(item!=""){
                    			value.selectedShutterWidth=item;
                    			var shutterPrice=((value.selectedShutterWidth*700)/90000)*value.selectedShutterRetailPrice;
                    			value.selectedShutterPrice=shutterPrice/*value.selectedShutterRetailPrice*item*/;
                    		}else{
                    			value.selectedShelvesWidth=0;
                    			value.selectedShutterPrice=0;
                    		}
                		}else{
                			toaster.pop("error", "Title", "Please select shutter type");
                		}
                	}
                	totalAmount+=value.selectedShutterPrice;
        		});
			 $scope.shutterTotalAmount=totalAmount;
			 $scope.quote.quote.totalAmount=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
			 if($scope.quote.quote.totalAmount<100000){
				 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.05;
			 }else if($scope.quote.quote.totalAmount>100000 && $scope.quote.quote.totalAmount<200000){
				 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.07;
			 }else if($scope.quote.quote.totalAmount>200000){
				 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.10;
			 }
			 $scope.quote.quote.discountedAmount=$scope.quote.quote.totalAmount-$scope.quote.quote.discount;
	}
	
	/*-------------------- --------
	  Profile glass Shutter table
	------------------------------*/
		 /*remove row*/
	    $scope.removeProfileGlassShutterRow = function(index) {
	      $scope.profileGlassShutters.splice(index, 1);
	      var totalAmount=0;
			 $.each($scope.profileGlassShutters, function(key,value) {
	         			totalAmount+=value.selectedGlassShutterPrice;
	 		});
			 $scope.profileGlassShutterTotalAmount=totalAmount;
			 $scope.quote.quote.totalAmount=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
			 if($scope.quote.quote.totalAmount<100000){
				 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.05;
			 }else if($scope.quote.quote.totalAmount>100000 && $scope.quote.quote.totalAmount<200000){
				 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.07;
			 }else if($scope.quote.quote.totalAmount>200000){
				 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.10;
			 }
		 	 $scope.quote.quote.discountedAmount=$scope.quote.quote.totalAmount-$scope.quote.quote.discount;
	    };
	
	    /*add row*/
	    $scope.addGlassShutterRow = function() {
	    	if($scope.profileGlassShutters!=undefined){
	    		 $scope.inserted = {
			        id: $scope.profileGlassShutters.length+1,
			        selectedGlassShutterName: '',
			        selectedGlassShutterSize: null,
			        selectedGlassShutterRetailPrice: null,
			        selectedGlassShutterQuantity: null, 
			        selectedGlassShutterPrice: null
	    		};
	    	}else{
	    		$scope.inserted = {
					id: 1,
					selectedGlassShutterName: '',
				        selectedGlassShutterSize: null,
				        selectedGlassShutterRetailPrice: null,
				        selectedGlassShutterQuantity: null, 
				        selectedGlassShutterPrice: null  
				  };
	    	}
	      $scope.profileGlassShutters.push($scope.inserted);
	    };
	/*Show profile glass shutter data*/
	$scope.showGlassShutterName  = function(){
		var queryParams=[{"name":"itemType","value":SysCodeTypeConstants.PROFILE_GLASS_SHUTTER}];
		  restService.invoke(REST_URLS.ITEMS,$scope,
	    		  function(response, status, headers, config,$scope){
	    	  		$scope.glassShutterData=response;
	      		  },function(response, status, headers, config,$scope){
	    	  
	      		},null,queryParams
	      );
	  }
	$scope.showGlassShutterName();
	/*Show size*/	
	$scope.showGlassShutterSize=function(item,index,isValid){
		$scope.selectedGlassShutterDataData=item;
		var pathParams={};
		 pathParams["itemId"]=item.id;
		 pathParams["stateId"]=$scope.state;
		  restService.invoke(REST_URLS.SIZE_OF_ITEM,$scope,
	         function(response, status, headers, config,$scope){
	               // $scope.sizes = response[item.id];
	                $scope.sizeDisabled=false;
	                $.each($scope.profileGlassShutters, function(key,value) {
	                	if(key==index){
	                		value.selectedGlassShutterName=item;
	                		value.sizes=response[item.id];
	                		if(isValid){
	                			value.selectedGlassShutterSize=null;
		                		value.selectedGlassShutterQuantity=0;
		                		value.selectedGlassShutterPrice=0;
		                		$scope.profileGlassShutterTotalAmount=0;
		                		$scope.quote.quote.totalAmount=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
		                		if($scope.quote.quote.totalAmount<100000){
		               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.05;
		               		 }else if($scope.quote.quote.totalAmount>100000 && $scope.quote.quote.totalAmount<200000){
		               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.07;
		               		 }else if($scope.quote.quote.totalAmount>200000){
		               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.10;
		               		 }
		           			 	$scope.quote.quote.discountedAmount=$scope.quote.quote.totalAmount-$scope.quote.quote.discount;
	                		}
	                	}
	        		});
	           },function(response, status, headers, config,$scope){
	 
	           },pathParams
	       );
	}
		/*Show Item price by item id	*/
		$scope.showGlassShutterRate=function(item,index,isValid){
			var pathParams={};
			 pathParams["itemId"]=$scope.selectedGlassShutterDataData.id;
			 pathParams["stateId"]=$scope.state;
			 
			 var queryParams=[{"name":"size","value":item}];
			  restService.invoke(REST_URLS.ITEM_PRICING_BY_ITEM_ID,$scope,
		         function(response, status, headers, config,$scope){
		                //$scope.carcaseRate = response;
		                $.each($scope.profileGlassShutters, function(key,value) {
		                	if(key==index){
		                		value.selectedGlassShutterSize=item;
		                		if(response==""){
		                			value.selectedGlassShutterRetailPrice="";
		                		}else{
		                			value.selectedGlassShutterRetailPrice=response[0].retailPrice;
		                		}
		                		if(isValid){
			                		value.selectedGlassShutterQuantity=0;
			                		value.selectedGlassShutterPrice=0;
			                		$scope.profileGlassShutterTotalAmount=0;
			                		$scope.quote.quote.totalAmount=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
			                		if($scope.quote.quote.totalAmount<100000){
			               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.05;
			               		 }else if($scope.quote.quote.totalAmount>100000 && $scope.quote.quote.totalAmount<200000){
			               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.07;
			               		 }else if($scope.quote.quote.totalAmount>200000){
			               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.10;
			               		 }
			           			 	$scope.quote.quote.discountedAmount=$scope.quote.quote.totalAmount-$scope.quote.quote.discount;
		                		}
		                	}
		        		});
		           },function(response, status, headers, config,$scope){
		 
		           },pathParams,queryParams
		       );
		}
	/*Calculate total amount*/
	$scope.calculateGlassShutterTotalAmount=function(item,index){
		var totalAmount=0;
			 $.each($scope.profileGlassShutters, function(key,value) {
                	if(key==index){
                		if(item!=""){
                			value.selectedGlassShutterQuantity=item;
                			//var shutterPrice=((value.selectedShutterWidth*700)/90000)*value.selectedShutterRetailPrice;
                			value.selectedGlassShutterPrice=value.selectedGlassShutterRetailPrice*item;
                		}else{
                			value.selectedGlassShutterQuantity="";
                			value.selectedGlassShutterPrice="";
                		}
                	}
                	totalAmount+=value.selectedGlassShutterPrice;
        		});
			 $scope.profileGlassShutterTotalAmount=totalAmount;
			 $scope.quote.quote.totalAmount=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
			 if($scope.quote.quote.totalAmount<100000){
				 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.05;
			 }else if($scope.quote.quote.totalAmount>100000 && $scope.quote.quote.totalAmount<200000){
				 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.07;
			 }else if($scope.quote.quote.totalAmount>200000){
				 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.10;
			 }
			 $scope.quote.quote.discountedAmount=$scope.quote.quote.totalAmount-$scope.quote.quote.discount;
	}
	
	/*-------------------- 
	  Shelves table
	---------------------*/
	
		 /*remove row*/
	    $scope.removeShelvesRow = function(index) {
	      $scope.shelves.splice(index, 1);
	      var totalAmount=0;
			 $.each($scope.shelves, function(key,value) {
	       			totalAmount+=value.selectedShelvesPrice;
			});
			 $scope.shelveTotalAmount=totalAmount;
			 $scope.quote.quote.totalAmount=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
			 if($scope.quote.quote.totalAmount<100000){
				 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.05;
			 }else if($scope.quote.quote.totalAmount>100000 && $scope.quote.quote.totalAmount<200000){
				 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.07;
			 }else if($scope.quote.quote.totalAmount>200000){
				 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.10;
			 }
		 	 $scope.quote.quote.discountedAmount=$scope.quote.quote.totalAmount-$scope.quote.quote.discount;
	    };
	
	    /*add row*/
	    $scope.addShelvesRow = function() {
	    	if($scope.shelves!=undefined){
	    		 $scope.inserted = {
			        id: $scope.shelves.length+1,
			        selectedShelvesName: '',
			        selectedShelvesRetailPrice: null,
			        selectedShelvesWidth: null,
			        selectedShelvesPrice: null
	    		};
	    	}else{
	    		$scope.inserted = {
					id: 1,
					selectedShelvesName: '',
		        selectedShelvesRetailPrice: null,
		        selectedShelvesWidth: null,
		        selectedShelvesPrice: null
				  };
	    	}
	      $scope.shelves.push($scope.inserted);
	    };
	 /*Show shelve data*/
	$scope.showShelvesName  = function(){
		var queryParams=[{"name":"itemType","value":SysCodeTypeConstants.SHELVE}];
		  restService.invoke(REST_URLS.ITEMS,$scope,
	    		  function(response, status, headers, config,$scope){
	    	  		$scope.shelvesData=response;
	      		  },function(response, status, headers, config,$scope){
	    	  
	      		},null,queryParams
	      );
	  }
	$scope.showShelvesName();
	
	/*Show Item price by item id	*/
	$scope.showShelvesRate=function(item,index){
		var pathParams={};
		 pathParams["itemId"]=item.id;
		 pathParams["stateId"]=$scope.state;
		 
		  restService.invoke(REST_URLS.ITEM_PRICING_BY_ITEM_ID,$scope,
	         function(response, status, headers, config,$scope){
	                //$scope.carcaseRate = response;
	                $.each($scope.shelves, function(key,value) {
	                	if(key==index){
	                		value.selectedShelvesName=item;
	                		if(response==""){
	                			value.selectedShelvesRetailPrice="";
	                		}else{
	                			value.selectedShelvesRetailPrice=response[0].retailPrice;
	                		}
		                		value.selectedShelvesWidth=0;
		                		value.selectedShelvesPrice=0;
		                		$scope.shelveTotalAmount=0;
		                		$scope.quote.quote.totalAmount=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
		                		if($scope.quote.quote.totalAmount<100000){
		               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.05;
		               		 }else if($scope.quote.quote.totalAmount>100000 && $scope.quote.quote.totalAmount<200000){
		               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.07;
		               		 }else if($scope.quote.quote.totalAmount>200000){
		               			 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.10;
		               		 }
		           			 	$scope.quote.quote.discountedAmount=$scope.quote.quote.totalAmount-$scope.quote.quote.discount;
	                	}
	        		});
	           },function(response, status, headers, config,$scope){
	 
	           },pathParams
	       );
	}
	
	/*Calculate total amount*/
	$scope.calculateShelvesTotalAmount=function(item,index){
		var totalAmount=0;
			 $.each($scope.shelves, function(key,value) {
                	if(key==index){
                		if(value.selectedShelvesName.itemName=="White on Ply Board"){
                			if(item!=""){
                    			value.selectedShelvesWidth=item;
                    			var shelvePrice=((value.selectedShelvesWidth*600)/90000)*value.selectedShelvesRetailPrice;
                    			value.selectedShelvesPrice=shelvePrice;
                    		}else{
                    			value.selectedShelvesWidth="";
                    			value.selectedShelvesPrice="";
                    		}
                		}else{
                			if(item!=""){
                    			value.selectedShelvesWidth=item;
                    			var shelvePrice=((value.selectedShelvesWidth*560)/90000)*value.selectedShelvesRetailPrice;
                    			value.selectedShelvesPrice=shelvePrice;
                    		}else{
                    			value.selectedShelvesWidth="";
                    			value.selectedShelvesPrice="";
                    		}
                		}
                	}
                	totalAmount+=value.selectedShelvesPrice;
        		});
			 $scope.shelveTotalAmount=totalAmount;
			 $scope.quote.quote.totalAmount=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
			 if($scope.quote.quote.totalAmount<100000){
				 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.05;
			 }else if($scope.quote.quote.totalAmount>100000 && $scope.quote.quote.totalAmount<200000){
				 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.07;
			 }else if($scope.quote.quote.totalAmount>200000){
				 $scope.quote.quote.discount=$scope.quote.quote.totalAmount*0.10;
			 }
			 $scope.quote.quote.discountedAmount=$scope.quote.quote.totalAmount-$scope.quote.quote.discount;
	}
	
	$scope.existingQuoteById=function(){
		var pathParams={};
		 pathParams["quoteId"]=quoteId;
		  restService.invoke(REST_URLS.GET_QUOTE_BY_ID,$scope,
	         function(response, status, headers, config,$scope){
	                $scope.quote = response;
	                $scope.state=$scope.quote.customer.stateId.toString();
	                $.each($scope.quote.quoteAmountList, function(key,value) {
	                	if(value.itemType=="10"){
		           	    		var queryParams=[{"name":"itemType","value":SysCodeTypeConstants.CARCASE}];
			          			  restService.invoke(REST_URLS.ITEMS,$scope,
			          		    		  function(response, status, headers, config,$scope){
			          		    	  		$scope.carcasesData=response;
			          		    	  	$.each($scope.carcasesData, function(key,val) {
			          		    	  		if(val.id==value.itemId){
			          		    	  		$scope.quoteNameDisabled=false;
					          		    	  	$scope.inserted = {
					    	           			        id: $scope.carcases.length+1,
					    	           			        selectedCarcaseName: val,
					    	           			        selectedCarcaseSize: value.itemDesc,
					    	           			        selectedCarcaseModularType: value.modularType,
					    	           			        selectedRetailPrice: value.price, 
					    	           			        selectedCarcaseQuantity: value.quantity,
					    	           			        selectedCarcasePrice: value.totalPrice 	           	    		
					    	           			     };
					    	                		$scope.carcases.push($scope.inserted);
					    	                		$scope.showSize(val,$scope.carcases.length-1,false);
					    	                		$scope.calculateTotalAmount(value.quantity,key);
			          		    	  			}
			          		    	  		})
			          		      		  },function(response, status, headers, config,$scope){
			          		    	  
			          		      		},null,queryParams
			          		      );
	                	}else if(value.itemType=="20"){
	                		var queryParams=[{"name":"itemType","value":SysCodeTypeConstants.NECESSARY_ACCESSORIES}];
		          			  restService.invoke(REST_URLS.ITEMS,$scope,
		          		    		  function(response, status, headers, config,$scope){
		          		    	  		$scope.necesryAccessoriesData=response;
		          		    	  	$.each($scope.necesryAccessoriesData, function(key,val) {
		          		    	  		if(val.id==value.itemId){
		          		    	  		$scope.quoteNameDisabled=false;
					                		 $scope.inserted = {
					             			        id: $scope.necessaryAccessories.length+1,
					             			        selectedNeceryAccessorieName: val,
					             			        selectedNeceryAccessorieSize: value.itemDesc,
					             			        selectedNeceryAccessorieRetailPrice: value.price,
					             			        selectedNeceryAccessorieQuantity: value.quantity, 
					             			        selectedNeceryAccessoriePrice: value.totalPrice,
					             	    		};
					                		 $scope.necessaryAccessories.push($scope.inserted);
					                		 $scope.showNecesryAccessoriesSize(val,$scope.necessaryAccessories.length-1,false);
					                		 $scope.calculateNesesryAssessorTotalAmount(value.quantity,key);
		          		    	  		}
	          		    	  		})
	          		      		  },function(response, status, headers, config,$scope){
	          		    	  
	          		      		},null,queryParams
	          		      );
	                	}else if(value.itemType=="30"){
	                		var queryParams=[{"name":"itemType","value":SysCodeTypeConstants.ADDON_ACCESSORIES}];
		          			  restService.invoke(REST_URLS.ITEMS,$scope,
		          		    		  function(response, status, headers, config,$scope){
		          		    	  		$scope.addOnAccessoriesData=response;
		          		    	  	$.each($scope.addOnAccessoriesData, function(key,val) {
		          		    	  		if(val.id==value.itemId){ 
		          		    	  		$scope.quoteNameDisabled=false;
					                		$scope.inserted = {
					             			        id: $scope.addOnAccessories.length+1,
					             			        selectedAddOnAccessorieName: val,
					             			        selectedAddOnAccessorieRetailPrice: value.price,
					             			        selectedAddOnAccessorieQuantity: value.quantity,
					             			        selectedAddOnAccessoriePrice: value.totalPrice, 
					             	    		};
					                		 $scope.addOnAccessories.push($scope.inserted);
					                		 $scope.calculateAddOnAssessorTotalAmount(value.quantity,key);
		          		    	  		}
	          		    	  		})
	          		      		  },function(response, status, headers, config,$scope){
	          		    	  
	          		      		},null,queryParams
	          		      );
	                	}else if(value.itemType=="40"){
	                		var queryParams=[{"name":"itemType","value":SysCodeTypeConstants.HARDWARE}];
		          			  restService.invoke(REST_URLS.ITEMS,$scope,
		          		    		  function(response, status, headers, config,$scope){
		          		    	  		$scope.hardwareData=response;
		          		    	  	$.each($scope.hardwareData, function(key,val) {
		          		    	  		if(val.id==value.itemId){
		          		    	  		$scope.quoteNameDisabled=false;
					                		$scope.inserted = {
					             			        id: $scope.hardwares.length+1,
					             			        selectedHardwareName: val,
					             			        selectedHardwareRetailPrice: value.price,
					             			        selectedHardwareQuantity: value.quantity, 
					             			        selectedHardwarePrice: value.totalPrice
					             	    		};
					                		 $scope.hardwares.push($scope.inserted);
					                		 $scope.calculateHardwareTotalAmount(value.quantity,key);
		          		    	  		}
	          		    	  		})
	          		      		  },function(response, status, headers, config,$scope){
	          		    	  
	          		      		},null,queryParams
	          		      );
	                	}else if(value.itemType=="50"){
	                		var queryParams=[{"name":"itemType","value":SysCodeTypeConstants.SHUTTER}];
		          			  restService.invoke(REST_URLS.ITEMS,$scope,
		          		    		  function(response, status, headers, config,$scope){
		          		    	  		$scope.shutterData=response;
		          		    	  	$.each($scope.shutterData, function(key,val) {
		          		    	  		if(val.id==value.itemId){
		          		    	  		$scope.quoteNameDisabled=false;
					                		$scope.inserted = {
					             			        id: $scope.shutters.length+1,
					             			        selectedLaminateType: val,
					             			        selectedShutterType: value.itemDesc,
					             			        selectedShutterRetailPrice: value.price,
					             			        selectedShutterWidth: value.quantity, 
					             			        selectedShutterPrice: value.totalPrice
					             	    		};
					                		 $scope.shutters.push($scope.inserted);
					                		 $scope.calculateShutterTotalAmount(value.quantity,key);
		          		    	  		}
	          		    	  		})
	          		      		  },function(response, status, headers, config,$scope){
	          		    	  
	          		      		},null,queryParams
	          		      );
	                	}else if(value.itemType=="60"){
	                		var queryParams=[{"name":"itemType","value":SysCodeTypeConstants.PROFILE_GLASS_SHUTTER}];
		          			  restService.invoke(REST_URLS.ITEMS,$scope,
		          		    		  function(response, status, headers, config,$scope){
		          		    	  		$scope.profileGlassShutterData=response;
		          		    	  	$.each($scope.profileGlassShutterData, function(key,val) {
		          		    	  		if(val.id==value.itemId){ 
		          		    	  		$scope.quoteNameDisabled=false;
					                		$scope.inserted = {
					             			        id: $scope.profileGlassShutters.length+1,
					             			        selectedGlassShutterName: val,
					             			        selectedGlassShutterSize: value.itemDesc,
					             			        selectedGlassShutterRetailPrice: value.price,
					             			        selectedGlassShutterQuantity: value.quantity, 
					             			        selectedGlassShutterPrice: value.totalPrice
					             	    		};
					                		 $scope.profileGlassShutters.push($scope.inserted);
					                		 $scope.showGlassShutterSize(val,$scope.profileGlassShutters.length-1,false);
					                		 $scope.calculateGlassShutterTotalAmount(value.quantity,key);
		          		    	  		}
	          		    	  		})
	          		      		  },function(response, status, headers, config,$scope){
	          		    	  
	          		      		},null,queryParams
	          		      );
	                	}else if(value.itemType=="70"){
	                		var queryParams=[{"name":"itemType","value":SysCodeTypeConstants.SHELVE}];
		          			  restService.invoke(REST_URLS.ITEMS,$scope,
		          		    		  function(response, status, headers, config,$scope){
		          		    	  		$scope.shelveData=response;
		          		    	  	$.each($scope.shelveData, function(key,val) {
		          		    	  		if(val.id==value.itemId){
		          		    	  		$scope.quoteNameDisabled=false;
						                		$scope.inserted = {
						             			        id: $scope.shelves.length+1,
						             			        selectedShelvesName: val,
						             			        selectedShelvesRetailPrice: value.price,
						             			        selectedShelvesWidth: value.quantity,
						             			        selectedShelvesPrice: value.totalPrice
						             	    		};
						                		 $scope.shelves.push($scope.inserted);
						                		 $scope.calculateShelvesTotalAmount(value.quantity,key);
		          		    	  		}
	          		    	  		})
	          		      		  },function(response, status, headers, config,$scope){
	          		    	  
	          		      		},null,queryParams
	          		      );
	                	}
	        		});
	           },function(response, status, headers, config,$scope){
	 
	           },pathParams
	       );
	}
	$scope.existingQuoteById();
	
	$scope.updateQuote=function(){
		var generateQuote={};
		
		var customer={};
		customer.id=$scope.quote.customer.id;
		customer.firstName=$scope.quote.customer.firstName;
		customer.middleName=$scope.quote.customer.middleName;
		customer.lastName=$scope.quote.customer.lastName;
		customer.email=$scope.quote.customer.email;
		customer.contactNum=$scope.quote.customer.contactNum;
		customer.address=$scope.quote.customer.address;
		customer.stateId=$scope.state;
		customer.createdBy=$scope.quote.customer.createdBy;
		customer.createdDate=new Date();
		
		var quote={};
		quote.id=$scope.quote.quote.id;
		quote.quoteNum=$scope.quote.quote.quoteNum;
		quote.customerId=$scope.quote.quote.customerId;
		quote.totalAmount=$scope.quote.quote.totalAmount;
		/*if($scope.additionalDiscount!="" && $scope.additionalDiscount!=undefined){
		if($scope.additionalDiscount!=""){*/
		if($scope.additionalDiscount!="" && $scope.additionalDiscount!=undefined ){
			var addedAdditionalDiscount=$scope.quote.quote.discount+parseFloat($scope.additionalDiscount);
			quote.discount=addedAdditionalDiscount;
			quote.discountedAmount=$scope.quote.quote.totalAmount-addedAdditionalDiscount;
		}else{
			quote.discount=$scope.quote.quote.discount;
			quote.discountedAmount=$scope.quote.quote.discountedAmount;
		}
		
		quote.createdBy=$scope.quote.quote.createdBy;
		quote.createdDate=$scope.quote.quote.createdDate;
		quote.updatedDate=new Date();
		
		var quoteAmountList=[];
		 $.each($scope.carcases, function(key,value) {
			 if(value.selectedCarcaseName!=null){
				 var data={};
				 data.itemId=value.selectedCarcaseName.id;
				 data.itemType=10;
				 data.itemDesc=value.selectedCarcaseSize;
				 data.modularType=value.selectedCarcaseModularType;
				 data.price=value.selectedRetailPrice;
				 data.quantity=value.selectedCarcaseQuantity;
				 data.totalPrice=value.selectedCarcasePrice;
				 quoteAmountList.push(data); 
			 }
		 });
		 
		$.each($scope.necessaryAccessories, function(key,value) {
			if(value.selectedNeceryAccessorieName!=null){
				 var data={};
				 data.itemId=value.selectedNeceryAccessorieName.id;
				 data.itemType=20;
				 data.itemDesc=value.selectedNeceryAccessorieSize;
				 data.price=value.selectedNeceryAccessorieRetailPrice;
				 data.quantity=value.selectedNeceryAccessorieQuantity;
				 data.totalPrice=value.selectedNeceryAccessoriePrice;
				 quoteAmountList.push(data);
			}
		 });
		 
		 $.each($scope.addOnAccessories, function(key,value) {
			 if(value.selectedAddOnAccessorieName!=null){
				 var data={};
				 data.itemId=value.selectedAddOnAccessorieName.id;
				 data.itemType=30;
				/* data.itemDesc=value.selectedCarcaseSize;
				 data.modularType=value.selectedCarcaseModularType;*/
				 data.price=value.selectedAddOnAccessorieRetailPrice;
				 data.quantity=value.selectedAddOnAccessorieQuantity;
				 data.totalPrice=value.selectedAddOnAccessoriePrice;
				 quoteAmountList.push(data);
			 }
		 });
		 
		 $.each($scope.hardwares, function(key,value) {
			 if(value.selectedHardwareName!=null){
				 var data={};
				 data.itemId=value.selectedHardwareName.id;
				 data.itemType=40;
				 data.itemDesc=value.selectedHardwareUnit;
				 //data.modularType=value.selectedCarcaseModularType;
				 data.price=value.selectedHardwareRetailPrice;
				 data.quantity=value.selectedHardwareQuantity;
				 data.totalPrice=value.selectedHardwarePrice;
				 quoteAmountList.push(data);
			 }
		 });
		 
		 $.each($scope.shutters, function(key,value) {
			 if(value.selectedLaminateType!=null){
				 var data={};
				 data.itemId=value.selectedLaminateType.id;
				 data.itemType=50;
				 data.itemDesc=value.selectedShutterType;
				// data.modularType=value.selectedCarcaseModularType;
				 data.price=value.selectedShutterRetailPrice;
				 data.quantity=value.selectedShutterWidth;
				 data.totalPrice=value.selectedShutterPrice;
				 quoteAmountList.push(data); 
			 }
		 });
		 
		 $.each($scope.profileGlassShutters, function(key,value) {
			 if(value.selectedGlassShutterName!=null){
				 var data={};
				 data.itemId=value.selectedGlassShutterName.id;
				 data.itemType=60;
				 data.itemDesc=value.selectedGlassShutterSize;
				 //data.modularType=value.selectedCarcaseModularType;
				 data.price=value.selectedGlassShutterRetailPrice;
				 data.quantity=value.selectedGlassShutterQuantity;
				 data.totalPrice=value.selectedGlassShutterPrice;
				 quoteAmountList.push(data);
			 }
		 });
		 
		 $.each($scope.shelves, function(key,value) {
			 if(value.selectedShelvesName!=null){
				 var data={};
				 data.itemId=value.selectedShelvesName.id;
				 data.itemType=70;
				 //data.itemDesc=value.selectedCarcaseSize;
				 //data.modularType=value.selectedCarcaseModularType;
				 data.price=value.selectedShelvesRetailPrice;
				 data.quantity=value.selectedShelvesWidth;
				 data.totalPrice=value.selectedShelvesPrice;
				 quoteAmountList.push(data); 
			 }
			
		 });
		 
		 generateQuote.customer=customer;
		 generateQuote.quote=quote;
		 generateQuote.quoteAmountList=quoteAmountList;
		 
		 var data=JSON.stringify(generateQuote)
		 restService.invoke(REST_URLS.UPDATE_QUOTE,$scope,
	   		  function(response, status, headers, config,$scope){
					 console.log(response);
					 if(response!=""){
						 toaster.pop("success", "Successfull", "Successfully update");
						 $timeout(function(){
							 $window.location.href = '#/app/existingQuotes';
			    	  		}, 1000);
						 $timeout(function(){
							 $window.location.href = '#/app/existingQuotes';
			    	  		}, 100);
					 }else{
						 toaster.pop("error", "Failed", "Updation failed");
					 }

	     		  },function(response, status, headers, config,$scope){

	     		},null,null,data
	     );
	}
}]);

