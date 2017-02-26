<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<style>
	.page-background{ 
	  background: url("<%=request.getContextPath()%>/img/login.jpg") no-repeat center center fixed; 
	  -webkit-background-size: cover;
	  -moz-background-size: cover;
	  -o-background-size: cover;
	  background-size: cover;
	}
	
	.login-box{
		border: solid 1px #C0C0C0;
	   
	    background-color: #fff;
	    padding: 20px;
	    border-radius: 5px;
	}
	
	.welcome-text{
		line-height: 300px !important;
		color: #fff;
	}

	
</style>
<html lang="en" data-ng-app="login">
<head>
  <meta charset="utf-8" />
  <title>Order To Cash</title>
  <meta name="description" content="Angularjs, Html5, Music, Landing, 4 in 1 ui kits package" />
  <meta name="keywords" content="AngularJS, angular, bootstrap, admin, dashboard, panel, app, charts, components,flat, responsive, layout, kit, ui, route, web, app, widgets" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
  <link rel="stylesheet" href="<%=request.getContextPath()%>/libs/assets/animate.css/animate.css" type="text/css" />
  <link rel="stylesheet" href="<%=request.getContextPath()%>/libs/assets/font-awesome/css/font-awesome.min.css" type="text/css" />
  <link rel="stylesheet" href="<%=request.getContextPath()%>/libs/assets/simple-line-icons/css/simple-line-icons.css" type="text/css" />
  <link rel="stylesheet" href="<%=request.getContextPath()%>/libs/jquery/bootstrap/dist/css/bootstrap.css" type="text/css" />
  
  <!-- build:css css/app.min.css -->
  <link rel="stylesheet" href="<%=request.getContextPath()%>/css/font.css" type="text/css" />
  <link rel="stylesheet" href="<%=request.getContextPath()%>/css/app.css" type="text/css" />

  <!-- endbuild -->
  
  <!-- custom css -->
  <link rel="stylesheet" href="<%=request.getContextPath()%>/css/OTC-Custom.css" type="text/css" />
  
  <!-- end custom css -->
  <script>
  	var CONTEXT_PATH = "<%=request.getContextPath()%>";
  </script>
</head>
<body class="page-background">
  <div class="app" id="app" >
  
  <div class="container w-xxl w-auto-xs" ng-controller="LoginController" ng-init="app.settings.container = false;">
	  <a href class="navbar-brand block m-t welcome-text">Order To Cash Administration</a>
	  <div class="m-b-lg login-box">
	    <div class="wrapper text-center">
	      <strong>Sign in</strong>
	    </div>
	    <form name="form" class="form-validation" action="<c:url value='login' />" method='POST'>
	      <div class="text-danger wrapper text-center" id="authError">
	          
	      </div>
	      <div class="list-group list-group-sm">
	        <div class="list-group-item">
	          <input type="text" placeholder="Email" class="form-control no-border"  name="username" >
	        </div>
	        <div class="list-group-item">
	           <input type="password" placeholder="Password" class="form-control no-border" name="password">
	        </div>
	        <div class="list-group-item">
			<div class="input-group">
				<label class="login-as-label">Login As</label>
				 <select name="login-type" class="form-control" style="width: 160px;float: right;margin-left: 5px">
					<option name="administrator" value="10">Administrator</option>
					<option name="agent" value="20">Agent</option>
				</select>
		   </div>
		  </div>
	      </div>
	      <button type="submit" class="btn btn-lg btn-primary btn-block" >Log in</button>
	      <!-- <div class="text-center m-t m-b"><a ui-sref="access.forgotpwd">Forgot password?</a></div> -->
	      <div class="line line-dashed"></div>
	      <!-- <p class="text-center"><small>Do not have an account?</small></p> -->
	    </form>
	  </div>
	</div>
  
  
  
  
  </div>

<!-- build:js js/app.angular.js -->
  <!-- jQuery -->
  <script src="<%=request.getContextPath()%>/libs/jquery/jquery/dist/jquery.js"></script>
  
  <script src="<%=request.getContextPath()%>/libs/assets/purl/purl.js"></script>
  
  <script>
  	$(document).ready(function(){
  		
  		var auth = $.url().param('auth');
  		if(auth== 'false'){
  			$("#authError").text("Invalid Username or Password. Please try again");
  		}
  		
  		
  	})
  
  </script>
  <!-- end modules controllers -->
</body>
</html>





