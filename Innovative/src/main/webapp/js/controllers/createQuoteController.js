'use strict';
app.controller('createQuoteController', ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes','restService','toaster','$window','$timeout', function($scope, $filter, $http, editableOptions, editableThemes,restService,toaster,$window,$timeout) {
		editableThemes.bs3.inputClass = 'input-sm';
	    editableThemes.bs3.buttonsClass = 'btn-sm';
	    editableOptions.theme = 'bs3';
	    $scope.carcases=[];
	    $scope.necessaryAccessories=[];
	    $scope.addOnAccessories=[];
	    $scope.hardwares=[];
	    $scope.shutters=[];
	    $scope.profileGlassShutters=[];
	    $scope.shelves=[];
	    $scope.sizeDisabled=true;
	    $scope.quoteNameDisabled=true;
	    $scope.modularTypeDisabled=true;
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
						    $scope.totalQuoteAmt=0;
							 $scope.discount=0;
							 $scope.finalQuoteAmt=0;
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
	/*-------------------- 
		carecase table
	-------------------*/
	  // $scope.carcases = [{id: 1, selectedCarcaseName: null, selectedCarcaseSize: null, selectedCarcaseModularType: null, selectedRetailPrice: null, selectedCarcaseQuantity: null, selectedCarcasePrice: null}];
	 /*remove row*/
	    $scope.removeCarcaseRow = function(index) {
	      $scope.carcases.splice(index, 1);
	      var totalAmount=0;
			 $.each($scope.carcases, function(key,value) {
             			totalAmount+=value.selectedCarcasePrice;
     		});
			 $scope.carcasesTotalAmount=totalAmount;
			 $scope.totalQuoteAmt=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
			 if($scope.totalQuoteAmt<100000){
				 $scope.discount=$scope.totalQuoteAmt*0.05;
			 }else if($scope.totalQuoteAmt>100000 && $scope.totalQuoteAmt<200000){
				 $scope.discount=$scope.totalQuoteAmt*0.07;
			 }else if($scope.totalQuoteAmt>200000){
				 $scope.discount=$scope.totalQuoteAmt*0.10;
			 }
			 $scope.finalQuoteAmt=$scope.totalQuoteAmt-$scope.discount;
	    };
	 /*add row*/
	    $scope.addCarcaseRow = function() {
	    	if($scope.carcases!=undefined){
	    		 $scope.inserted = {
			        id: $scope.carcases.length+1,
			        selectedCarcaseName: '',
			        selectedCarcaseSize: null,
			        selectedCarcaseModularType: null,
			        selectedRetailPrice: null, 
			        selectedCarcaseQuantity: null,
			        selectedCarcasePrice: null 
	    		};
	    	}else{
	    		$scope.inserted = {
    				id: 1,
			        selectedCarcaseName: '',
			        selectedCarcaseSize: null,
			        selectedCarcaseModularType: null,
			        selectedRetailPrice: null, 
			        selectedCarcaseQuantity: null,
			        selectedCarcasePrice: null   
    			  };
	    	}
	      $scope.carcases.push($scope.inserted);
	    };
	/*Show carecase*/
		$scope.showData  = function(){
			var queryParams=[{"name":"itemType","value":SysCodeTypeConstants.CARCASE}];
			  restService.invoke(REST_URLS.ITEMS,$scope,
		    		  function(response, status, headers, config,$scope){
		    	  		$scope.items=response;
		      		  },function(response, status, headers, config,$scope){
		    	  
		      		},null,queryParams
		      );
		  }
		$scope.showData();
		
		/*Show size*/	
		$scope.showSize=function(item,index){
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
		                		if(item.itemName!="Base Unit Regular" && item.itemName!="Base Sink Unit(No Top,No Bottom)" && item.itemName!="Base Hobs Unit(No Top)" ){
		                			value.selectedCarcaseModularType="10";
		                			$scope.modularTypeDisabled=true;
		          	           	}else{
		          	           		$scope.modularTypeDisabled=false;
		          	           		value.selectedCarcaseModularType=null;
		          	           	}
		                		value.selectedCarcaseName=item;
		                		value.sizes=response[item.id];
		                		/*if(item.itemName!="Base Unit Regular"){
	                				value.selectedCarcaseModularType=null;
	                			}*/
	                			value.selectedCarcaseSize=null;
		                		value.selectedRetailPrice=null;
		                		value.selectedCarcaseQuantity=0;
		                		value.selectedCarcasePrice=0;
		                		$scope.carcasesTotalAmount=0;
		                		$scope.totalQuoteAmt=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
		                		 if($scope.totalQuoteAmt<100000){
		            				 $scope.discount=$scope.totalQuoteAmt*0.05;
		            			 }else if($scope.totalQuoteAmt>100000 && $scope.totalQuoteAmt<200000){
		            				 $scope.discount=$scope.totalQuoteAmt*0.07;
		            			 }else if($scope.totalQuoteAmt>200000){
		            				 $scope.discount=$scope.totalQuoteAmt*0.10;
		            			 }
		       				 	$scope.finalQuoteAmt=$scope.totalQuoteAmt-$scope.discount;
		                	}
		        		});
		           },function(response, status, headers, config,$scope){
		 
		           },pathParams
		       );
		}
	/*Show modular*/
		$scope.showModular=function(item,index){
			if(item!=null){
				$scope.carcaseSize=item;
				//$scope.modularTypeDisabled=false;
				 $.each($scope.carcases, function(key,value) {
	                	if(key==index){
	                		value.selectedCarcaseSize=item;
	                		if($scope.carcaseName.itemName!="Base Unit Regular" && $scope.carcaseName.itemName!="Base Sink Unit(No Top,No Bottom)" && $scope.carcaseName.itemName!="Base Hobs Unit(No Top)" ){
	                			value.selectedCarcaseModularType="10";
	                			$scope.modularTypeDisabled=true;
	                		}else{
	                			$scope.modularTypeDisabled=false;
	                			value.selectedCarcaseModularType=null;
                				value.selectedRetailPrice=null;
	                		}
	                		/*if($scope.carcaseName.itemName!="Base Unit Regular"){
                				value.selectedCarcaseModularType=null;
                				value.selectedRetailPrice=null;
                			}*/
	                		value.selectedCarcaseQuantity=0;
	                		value.selectedCarcasePrice=0;
	                		$scope.carcasesTotalAmount=0;
	                		$scope.totalQuoteAmt=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
	                		 if($scope.totalQuoteAmt<100000){
	            				 $scope.discount=$scope.totalQuoteAmt*0.05;
	            			 }else if($scope.totalQuoteAmt>100000 && $scope.totalQuoteAmt<200000){
	            				 $scope.discount=$scope.totalQuoteAmt*0.07;
	            			 }else if($scope.totalQuoteAmt>200000){
	            				 $scope.discount=$scope.totalQuoteAmt*0.10;
	            			 }
	       				 	$scope.finalQuoteAmt=$scope.totalQuoteAmt-$scope.discount;
	                	}
	        		});
				 if($scope.carcaseName.itemName!="Base Unit Regular" && $scope.carcaseName.itemName!="Base Sink Unit(No Top,No Bottom)" && $scope.carcaseName.itemName!="Base Hobs Unit(No Top)"){
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
		                		$scope.totalQuoteAmt=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
		                		 if($scope.totalQuoteAmt<100000){
		            				 $scope.discount=$scope.totalQuoteAmt*0.05;
		            			 }else if($scope.totalQuoteAmt>100000 && $scope.totalQuoteAmt<200000){
		            				 $scope.discount=$scope.totalQuoteAmt*0.07;
		            			 }else if($scope.totalQuoteAmt>200000){
		            				 $scope.discount=$scope.totalQuoteAmt*0.10;
		            			 }
		       				 	$scope.finalQuoteAmt=$scope.totalQuoteAmt-$scope.discount;
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
				 $scope.totalQuoteAmt=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
				 if($scope.totalQuoteAmt<100000){
					 $scope.discount=$scope.totalQuoteAmt*0.05;
				 }else if($scope.totalQuoteAmt>100000 && $scope.totalQuoteAmt<200000){
					 $scope.discount=$scope.totalQuoteAmt*0.07;
				 }else if($scope.totalQuoteAmt>200000){
					 $scope.discount=$scope.totalQuoteAmt*0.10;
				 }
				 $scope.finalQuoteAmt=$scope.totalQuoteAmt-$scope.discount;
		}
		
		
		/*-------------------- ------
		Necessary Accessories table
		----------------------------*/
		
		
	//   $scope.necessaryAccessories = [{id: 1, selectedNeceryAccessorieName: null, selectedNeceryAccessorieSize: null, selectedNeceryAccessorieRetailPrice: null, selectedNeceryAccessorieQuantity: null, selectedNeceryAccessoriePrice: null}];
	 /*remove row*/
	    $scope.removeNeceryAccessorieRow = function(index) {
	      $scope.necessaryAccessories.splice(index, 1);
	      var totalAmount=0;
			 $.each($scope.necessaryAccessories, function(key,value) {
             			totalAmount+=value.selectedNeceryAccessoriePrice;
     		});
			 $scope.accessoryTotalAmount=totalAmount;
			 $scope.totalQuoteAmt=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
			 if($scope.totalQuoteAmt<100000){
				 $scope.discount=$scope.totalQuoteAmt*0.05;
			 }else if($scope.totalQuoteAmt>100000 && $scope.totalQuoteAmt<200000){
				 $scope.discount=$scope.totalQuoteAmt*0.07;
			 }else if($scope.totalQuoteAmt>200000){
				 $scope.discount=$scope.totalQuoteAmt*0.10;
			 }
			 $scope.finalQuoteAmt=$scope.totalQuoteAmt-$scope.discount;
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
		$scope.showNecesryAccessoriesSize=function(item,index){
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
		                		value.selectedNeceryAccessorieSize=null;
		                		value.selectedNeceryAccessorieRetailPrice=null;
		                		value.selectedNeceryAccessorieQuantity=0;
		                		value.selectedNeceryAccessoriePrice=0;
		                		$scope.accessoryTotalAmount=0;
		                		$scope.totalQuoteAmt=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
		                		 if($scope.totalQuoteAmt<100000){
		            				 $scope.discount=$scope.totalQuoteAmt*0.05;
		            			 }else if($scope.totalQuoteAmt>100000 && $scope.totalQuoteAmt<200000){
		            				 $scope.discount=$scope.totalQuoteAmt*0.07;
		            			 }else if($scope.totalQuoteAmt>200000){
		            				 $scope.discount=$scope.totalQuoteAmt*0.10;
		            			 }
		                		$scope.finalQuoteAmt=$scope.totalQuoteAmt-$scope.discount;
		                	}
		        		});
		           },function(response, status, headers, config,$scope){
		 
		           },pathParams
		       );
		}
/*	Show modular
		$scope.showModular=function(item,index){
			if(item!=null){
				$scope.carcaseSize=item;
				$scope.modularTypeDisabled=false;
				 $.each($scope.carcases, function(key,value) {
	                	if(key==index){
	                		value.selectedCarcaseSize=item;
	                	}
	        		});
			}
		}*/
	/*Show Item price by item id	*/
		$scope.showNesesryAccessoryRate=function(item,index){
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
		                		value.selectedNeceryAccessorieQuantity=0;
		                		value.selectedNeceryAccessoriePrice=0;
		                		$scope.accessoryTotalAmount=0;
		                		$scope.totalQuoteAmt=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
		                		 if($scope.totalQuoteAmt<100000){
		            				 $scope.discount=$scope.totalQuoteAmt*0.05;
		            			 }else if($scope.totalQuoteAmt>100000 && $scope.totalQuoteAmt<200000){
		            				 $scope.discount=$scope.totalQuoteAmt*0.07;
		            			 }else if($scope.totalQuoteAmt>200000){
		            				 $scope.discount=$scope.totalQuoteAmt*0.10;
		            			 }
		                		$scope.finalQuoteAmt=$scope.totalQuoteAmt-$scope.discount;
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
				 $scope.totalQuoteAmt=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
				 if($scope.totalQuoteAmt<100000){
					 $scope.discount=$scope.totalQuoteAmt*0.05;
				 }else if($scope.totalQuoteAmt>100000 && $scope.totalQuoteAmt<200000){
					 $scope.discount=$scope.totalQuoteAmt*0.07;
				 }else if($scope.totalQuoteAmt>200000){
					 $scope.discount=$scope.totalQuoteAmt*0.10;
				 }
				 $scope.finalQuoteAmt=$scope.totalQuoteAmt-$scope.discount;
		}
		
		
		/*-------------------- ------
		Add-On Accessories table
		----------------------------*/
		
		
	 //  $scope.addOnAccessories = [{id: 1, selectedAddOnAccessorieName: null, selectedAddOnAccessorieRetailPrice: null, selectedAddOnAccessorieQuantity: null, selectedAddOnAccessoriePrice: null}];
	 /*remove row*/
	    $scope.removeAddOnAccessorieRow = function(index) {
	      $scope.addOnAccessories.splice(index, 1);
	      var totalAmount=0;
			 $.each($scope.addOnAccessories, function(key,value) {
             			totalAmount+=value.selectedAddOnAccessoriePrice;
     		});
			 $scope.addOnAccessoryTotalAmount=totalAmount;
			 $scope.totalQuoteAmt=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
			 if($scope.totalQuoteAmt<100000){
				 $scope.discount=$scope.totalQuoteAmt*0.05;
			 }else if($scope.totalQuoteAmt>100000 && $scope.totalQuoteAmt<200000){
				 $scope.discount=$scope.totalQuoteAmt*0.07;
			 }else if($scope.totalQuoteAmt>200000){
				 $scope.discount=$scope.totalQuoteAmt*0.10;
			 }
			 $scope.finalQuoteAmt=$scope.totalQuoteAmt-$scope.discount;
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
	/*Show accessories*/
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
		$scope.showAddOnAccessoryRate=function(item,index){
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
		                		value.selectedAddOnAccessorieQuantity=0;
		                		value.selectedAddOnAccessoriePrice=0;
		                		$scope.addOnAccessoryTotalAmount=0;
		                		$scope.totalQuoteAmt=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
		                		 if($scope.totalQuoteAmt<100000){
		            				 $scope.discount=$scope.totalQuoteAmt*0.05;
		            			 }else if($scope.totalQuoteAmt>100000 && $scope.totalQuoteAmt<200000){
		            				 $scope.discount=$scope.totalQuoteAmt*0.07;
		            			 }else if($scope.totalQuoteAmt>200000){
		            				 $scope.discount=$scope.totalQuoteAmt*0.10;
		            			 }
		                		$scope.finalQuoteAmt=$scope.totalQuoteAmt-$scope.discount;
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
				 $scope.totalQuoteAmt=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
				 if($scope.totalQuoteAmt<100000){
					 $scope.discount=$scope.totalQuoteAmt*0.05;
				 }else if($scope.totalQuoteAmt>100000 && $scope.totalQuoteAmt<200000){
					 $scope.discount=$scope.totalQuoteAmt*0.07;
				 }else if($scope.totalQuoteAmt>200000){
					 $scope.discount=$scope.totalQuoteAmt*0.10;
				 }
				 $scope.finalQuoteAmt=$scope.totalQuoteAmt-$scope.discount;
		}
		
		/*-------------------- 
		Hardware table
		-------------------*/
	  // $scope.hardwares = [{id: 1, selectedHardwareName: null, selectedHardwareUnit: null, selectedHardwareRetailPrice: null, selectedHardwareQuantity: null, selectedHardwarePrice: null}];
	 /*remove row*/
	    $scope.removeHardwareRow = function(index) {
	      $scope.hardwares.splice(index, 1);
	      var totalAmount=0;
			 $.each($scope.hardwares, function(key,value) {
             			totalAmount+=value.selectedHardwarePrice;
     		});
			 $scope.hardwareTotalAmount=totalAmount;
			 $scope.totalQuoteAmt=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
			 if($scope.totalQuoteAmt<100000){
				 $scope.discount=$scope.totalQuoteAmt*0.05;
			 }else if($scope.totalQuoteAmt>100000 && $scope.totalQuoteAmt<200000){
				 $scope.discount=$scope.totalQuoteAmt*0.07;
			 }else if($scope.totalQuoteAmt>200000){
				 $scope.discount=$scope.totalQuoteAmt*0.10;
			 }
			 $scope.finalQuoteAmt=$scope.totalQuoteAmt-$scope.discount;
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
		$scope.showHardwareRate=function(item,index){
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
		                		value.selectedHardwareQuantity=0;
		                		value.selectedHardwarePrice=0;
		                		$scope.hardwareTotalAmount=0;
		                		$scope.totalQuoteAmt=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
		                		 if($scope.totalQuoteAmt<100000){
		            				 $scope.discount=$scope.totalQuoteAmt*0.05;
		            			 }else if($scope.totalQuoteAmt>100000 && $scope.totalQuoteAmt<200000){
		            				 $scope.discount=$scope.totalQuoteAmt*0.07;
		            			 }else if($scope.totalQuoteAmt>200000){
		            				 $scope.discount=$scope.totalQuoteAmt*0.10;
		            			 }
		                		$scope.finalQuoteAmt=$scope.totalQuoteAmt-$scope.discount;
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
				 $scope.totalQuoteAmt=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
				 if($scope.totalQuoteAmt<100000){
					 $scope.discount=$scope.totalQuoteAmt*0.05;
				 }else if($scope.totalQuoteAmt>100000 && $scope.totalQuoteAmt<200000){
					 $scope.discount=$scope.totalQuoteAmt*0.07;
				 }else if($scope.totalQuoteAmt>200000){
					 $scope.discount=$scope.totalQuoteAmt*0.10;
				 }
				 $scope.finalQuoteAmt=$scope.totalQuoteAmt-$scope.discount;
		}
	
		
		/*-------------------- 
		Shutter table
		-------------------*/
	  // $scope.shutters = [{id: 1, selectedLaminateType: null, selectedShutterType: null, selectedShutterRetailPrice: null, selectedShutterWidth: null, selectedShutterPrice: null}];
	 /*remove row*/
	    $scope.removeShutterRow = function(index) {
	      $scope.shutters.splice(index, 1);
	      var totalAmount=0;
			 $.each($scope.shutters, function(key,value) {
             			totalAmount+=value.selectedShutterPrice;
     		});
			 $scope.shutterTotalAmount=totalAmount;
			 $scope.totalQuoteAmt=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
			 if($scope.totalQuoteAmt<100000){
				 $scope.discount=$scope.totalQuoteAmt*0.05;
			 }else if($scope.totalQuoteAmt>100000 && $scope.totalQuoteAmt<200000){
				 $scope.discount=$scope.totalQuoteAmt*0.07;
			 }else if($scope.totalQuoteAmt>200000){
				 $scope.discount=$scope.totalQuoteAmt*0.10;
			 }
			 $scope.finalQuoteAmt=$scope.totalQuoteAmt-$scope.discount;
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
		$scope.showShutterRate=function(item,index){
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
		                		value.selectedShutterType=null;
		                		value.selectedShutterWidth=0;
		                		value.selectedShutterPrice=0;
		                		$scope.shutterTotalAmount=0;
		                		$scope.totalQuoteAmt=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
		                		 if($scope.totalQuoteAmt<100000){
		            				 $scope.discount=$scope.totalQuoteAmt*0.05;
		            			 }else if($scope.totalQuoteAmt>100000 && $scope.totalQuoteAmt<200000){
		            				 $scope.discount=$scope.totalQuoteAmt*0.07;
		            			 }else if($scope.totalQuoteAmt>200000){
		            				 $scope.discount=$scope.totalQuoteAmt*0.10;
		            			 }
		                		$scope.finalQuoteAmt=$scope.totalQuoteAmt-$scope.discount;
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
             		$scope.totalQuoteAmt=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
             		 if($scope.totalQuoteAmt<100000){
        				 $scope.discount=$scope.totalQuoteAmt*0.05;
        			 }else if($scope.totalQuoteAmt>100000 && $scope.totalQuoteAmt<200000){
        				 $scope.discount=$scope.totalQuoteAmt*0.07;
        			 }else if($scope.totalQuoteAmt>200000){
        				 $scope.discount=$scope.totalQuoteAmt*0.10;
        			 }
             		$scope.finalQuoteAmt=$scope.totalQuoteAmt-$scope.discount;
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
				 $scope.totalQuoteAmt=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
				 if($scope.totalQuoteAmt<100000){
					 $scope.discount=$scope.totalQuoteAmt*0.05;
				 }else if($scope.totalQuoteAmt>100000 && $scope.totalQuoteAmt<200000){
					 $scope.discount=$scope.totalQuoteAmt*0.07;
				 }else if($scope.totalQuoteAmt>200000){
					 $scope.discount=$scope.totalQuoteAmt*0.10;
				 }
				 $scope.finalQuoteAmt=$scope.totalQuoteAmt-$scope.discount;
		}
		
		
		/*-------------------- --------
		  Profile glass Shutter table
		------------------------------*/
	  // $scope.profileGlassShutters = [{id: 1, selectedGlassShutterName: null, selectedGlassShutterSize: null, selectedGlassShutterRetailPrice: null, selectedGlassShutterQuantity: null, selectedGlassShutterPrice: null}];
	 /*remove row*/
	    $scope.removeProfileGlassShutterRow = function(index) {
	      $scope.profileGlassShutters.splice(index, 1);
	      var totalAmount=0;
			 $.each($scope.profileGlassShutters, function(key,value) {
             			totalAmount+=value.selectedGlassShutterPrice;
     		});
			 $scope.profileGlassShutterTotalAmount=totalAmount;
			 $scope.totalQuoteAmt=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
			 if($scope.totalQuoteAmt<100000){
				 $scope.discount=$scope.totalQuoteAmt*0.05;
			 }else if($scope.totalQuoteAmt>100000 && $scope.totalQuoteAmt<200000){
				 $scope.discount=$scope.totalQuoteAmt*0.07;
			 }else if($scope.totalQuoteAmt>200000){
				 $scope.discount=$scope.totalQuoteAmt*0.10;
			 }
			 $scope.finalQuoteAmt=$scope.totalQuoteAmt-$scope.discount;
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
		$scope.showGlassShutterSize=function(item,index){
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
		                		value.selectedGlassShutterSize=null;
		                		value.selectedGlassShutterQuantity=0;
		                		value.selectedGlassShutterPrice=0;
		                		$scope.profileGlassShutterTotalAmount=0;
		                		$scope.totalQuoteAmt=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
		                		 if($scope.totalQuoteAmt<100000){
		            				 $scope.discount=$scope.totalQuoteAmt*0.05;
		            			 }else if($scope.totalQuoteAmt>100000 && $scope.totalQuoteAmt<200000){
		            				 $scope.discount=$scope.totalQuoteAmt*0.07;
		            			 }else if($scope.totalQuoteAmt>200000){
		            				 $scope.discount=$scope.totalQuoteAmt*0.10;
		            			 }
		                		$scope.finalQuoteAmt=$scope.totalQuoteAmt-$scope.discount;
		                	}
		        		});
		           },function(response, status, headers, config,$scope){
		 
		           },pathParams
		       );
		}
		
	/*Show Item price by item id	*/
		$scope.showGlassShutterRate=function(item,index){
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
		                		value.selectedGlassShutterQuantity=0;
		                		value.selectedGlassShutterPrice=0;
		                		$scope.profileGlassShutterTotalAmount=0;
		                		$scope.totalQuoteAmt=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
		                		 if($scope.totalQuoteAmt<100000){
		            				 $scope.discount=$scope.totalQuoteAmt*0.05;
		            			 }else if($scope.totalQuoteAmt>100000 && $scope.totalQuoteAmt<200000){
		            				 $scope.discount=$scope.totalQuoteAmt*0.07;
		            			 }else if($scope.totalQuoteAmt>200000){
		            				 $scope.discount=$scope.totalQuoteAmt*0.10;
		            			 }
		       				 	$scope.finalQuoteAmt=$scope.totalQuoteAmt-$scope.discount;
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
				 $scope.totalQuoteAmt=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
				 if($scope.totalQuoteAmt<100000){
					 $scope.discount=$scope.totalQuoteAmt*0.05;
				 }else if($scope.totalQuoteAmt>100000 && $scope.totalQuoteAmt<200000){
					 $scope.discount=$scope.totalQuoteAmt*0.07;
				 }else if($scope.totalQuoteAmt>200000){
					 $scope.discount=$scope.totalQuoteAmt*0.10;
				 }
				 $scope.finalQuoteAmt=$scope.totalQuoteAmt-$scope.discount;
		}

		
		/*-------------------- 
		  Shelves table
		---------------------*/
	  // $scope.shelves = [{id: 1, selectedShelvesName: null, selectedShelvesRetailPrice: null, selectedShelvesWidth: null, selectedShelvesPrice: null}];
	 /*remove row*/
	    $scope.removeShelvesRow = function(index) {
	      $scope.shelves.splice(index, 1);
	      var totalAmount=0;
			 $.each($scope.shelves, function(key,value) {
           			totalAmount+=value.selectedShelvesPrice;
   		});
			 $scope.shelveTotalAmount=totalAmount;
			 $scope.totalQuoteAmt=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
			 if($scope.totalQuoteAmt<100000){
				 $scope.discount=$scope.totalQuoteAmt*0.05;
			 }else if($scope.totalQuoteAmt>100000 && $scope.totalQuoteAmt<200000){
				 $scope.discount=$scope.totalQuoteAmt*0.07;
			 }else if($scope.totalQuoteAmt>200000){
				 $scope.discount=$scope.totalQuoteAmt*0.10;
			 }
			 $scope.finalQuoteAmt=$scope.totalQuoteAmt-$scope.discount;
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
		                		$scope.totalQuoteAmt=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
		                		 if($scope.totalQuoteAmt<100000){
		            				 $scope.discount=$scope.totalQuoteAmt*0.05;
		            			 }else if($scope.totalQuoteAmt>100000 && $scope.totalQuoteAmt<200000){
		            				 $scope.discount=$scope.totalQuoteAmt*0.07;
		            			 }else if($scope.totalQuoteAmt>200000){
		            				 $scope.discount=$scope.totalQuoteAmt*0.10;
		            			 }
		       				 $scope.finalQuoteAmt=$scope.totalQuoteAmt-$scope.discount;
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
	                		if(item!=""){
	                			value.selectedShelvesWidth=item;
	                			var shelvePrice=((value.selectedShelvesWidth*560)/90000)*value.selectedShelvesRetailPrice;
	                			value.selectedShelvesPrice=shelvePrice;
	                		}else{
	                			value.selectedShelvesWidth="";
	                			value.selectedShelvesPrice="";
	                		}
	                	}
	                	totalAmount+=value.selectedShelvesPrice;
	        		});
				 $scope.shelveTotalAmount=totalAmount;
				 $scope.totalQuoteAmt=$scope.carcasesTotalAmount+$scope.accessoryTotalAmount+$scope.addOnAccessoryTotalAmount+$scope.hardwareTotalAmount+$scope.shutterTotalAmount+$scope.profileGlassShutterTotalAmount+$scope.shelveTotalAmount;
				 if($scope.totalQuoteAmt<100000){
					 $scope.discount=$scope.totalQuoteAmt*0.05;
				 }else if($scope.totalQuoteAmt>100000 && $scope.totalQuoteAmt<200000){
					 $scope.discount=$scope.totalQuoteAmt*0.07;
				 }else if($scope.totalQuoteAmt>200000){
					 $scope.discount=$scope.totalQuoteAmt*0.10;
				 }
				 $scope.finalQuoteAmt=$scope.totalQuoteAmt-$scope.discount;
		}
		$scope.createQuote=function(){
			var generateQuote={};
			
			var customer={};
			customer.firstName=$scope.firstName;
			customer.middleName=$scope.middleName;
			customer.lastName=$scope.lastName;
			customer.email=$scope.email;
			customer.contactNum=$scope.contactNumber;
			customer.address=$scope.address;
			customer.stateId=$scope.state;
			customer.createdDate=new Date();
			
			var quote={};
			quote.totalAmount=$scope.totalQuoteAmt;
			quote.discount=$scope.discount;
			quote.discountedAmount=$scope.finalQuoteAmt;
			quote.createdDate=new Date();
			
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
			 restService.invoke(REST_URLS.CREATE_QUOTE,$scope,
		   		  function(response, status, headers, config,$scope){
						 console.log(response);
						 if(response!=""){
							 toaster.pop("success", "Successfull", "Your quote is created successfully");
							 $timeout(function(){
								 $window.location.href = '#/app/existingQuotes';
				    	  		}, 1000);
						 }else{
							 toaster.pop("error", "Failed", "Quote creation failed");
						 }

		     		  },function(response, status, headers, config,$scope){

		     		},null,null,data
		     );
		}
		
}]);

