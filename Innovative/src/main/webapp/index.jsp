<!DOCTYPE html>
<html lang="en" data-ng-app="app">
<head>
  <meta charset="utf-8" />
  <title>Order To Cash Admin</title>
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
  <link rel="stylesheet" href="<%=request.getContextPath()%>/libs/angular/angular-xeditable/dist/css/xeditable.css" type="text/css" />
  <link rel="stylesheet" href="<%=request.getContextPath()%>/libs/angular/angular-ui-select/dist/select.css" type="text/css" />
  <link rel="stylesheet" href="<%=request.getContextPath()%>/js/app/datatables/dataTables.bootstrap.css">
   <link rel="stylesheet" href="<%=request.getContextPath()%>/libs/angular/angularjs-toaster/toaster.css">
  <!-- endbuild -->
  
  <!-- custom css -->
  <link rel="stylesheet" href="<%=request.getContextPath()%>/css/OTC-Custom.css" type="text/css" />
  
  <!-- end custom css -->
  <script>
  	var CONTEXT_PATH = "<%=request.getContextPath()%>";
  </script>
</head>
<body ng-controller="AppCtrl">
  <div class="app" id="app" ng-class="{'app-header-fixed':app.settings.headerFixed, 'app-aside-fixed':app.settings.asideFixed, 'app-aside-folded':app.settings.asideFolded, 'app-aside-dock':app.settings.asideDock, 'container':app.settings.container}" ui-view></div>

<!-- build:js js/app.angular.js -->
  <!-- jQuery -->
  <script src="<%=request.getContextPath()%>/libs/jquery/jquery/dist/jquery.js"></script>
  <!-- Bootstrap -->
  <script src="<%=request.getContextPath()%>/libs/jquery/bootstrap/dist/js/bootstrap.js"></script>

  <!-- Angular -->
  <script src="<%=request.getContextPath()%>/libs/angular/angular/angular.js"></script>
  
  <script src="<%=request.getContextPath()%>/libs/angular/angular-animate/angular-animate.js"></script>
  <script src="<%=request.getContextPath()%>/libs/angular/angular-aria/angular-aria.js"></script>
  <script src="<%=request.getContextPath()%>/libs/angular/angular-cookies/angular-cookies.js"></script>
  <script src="<%=request.getContextPath()%>/libs/angular/angular-messages/angular-messages.js"></script>
  <script src="<%=request.getContextPath()%>/libs/angular/angular-resource/angular-resource.js"></script>
  <script src="<%=request.getContextPath()%>/libs/angular/angular-sanitize/angular-sanitize.js"></script>
  <script src="<%=request.getContextPath()%>/libs/angular/angular-touch/angular-touch.js"></script>
  
  <script src="<%=request.getContextPath()%>/libs/angular/angular-ui-router/release/angular-ui-router.js"></script> 
  <script src="<%=request.getContextPath()%>/libs/angular/ngstorage/ngStorage.js"></script>
  <script src="<%=request.getContextPath()%>/libs/angular/angular-ui-utils/ui-utils.js"></script>

  <!-- bootstrap -->
  <script src="<%=request.getContextPath()%>/libs/angular/angular-bootstrap/ui-bootstrap-tpls.js"></script>
  <!-- lazyload -->
  <script src="<%=request.getContextPath()%>/libs/angular/oclazyload/dist/ocLazyLoad.js"></script>
  <!-- translate -->
  <script src="<%=request.getContextPath()%>/libs/angular/angular-translate/angular-translate.js"></script>
  <script src="<%=request.getContextPath()%>/libs/angular/angular-translate-loader-static-files/angular-translate-loader-static-files.js"></script>
  <script src="<%=request.getContextPath()%>/libs/angular/angular-translate-storage-cookie/angular-translate-storage-cookie.js"></script>
  <script src="<%=request.getContextPath()%>/libs/angular/angular-translate-storage-local/angular-translate-storage-local.js"></script>

  <!-- App -->
  <script src="<%=request.getContextPath()%>/js/app.js"></script>
  <script src="<%=request.getContextPath()%>/js/config.js"></script>
  <script src="<%=request.getContextPath()%>/js/config.lazyload.js"></script>
  <script src="<%=request.getContextPath()%>/js/config.router.js"></script>
  <script src="<%=request.getContextPath()%>/js/main.js"></script>
  <script src="<%=request.getContextPath()%>/js/services/ui-load.js"></script>
  <script src="<%=request.getContextPath()%>/js/filters/fromNow.js"></script>
  <script src="<%=request.getContextPath()%>/js/directives/setnganimate.js"></script>
  <script src="<%=request.getContextPath()%>/js/directives/ui-butterbar.js"></script>
  <script src="<%=request.getContextPath()%>/js/directives/ui-focus.js"></script>
  <script src="<%=request.getContextPath()%>/js/directives/ui-fullscreen.js"></script>
  <script src="<%=request.getContextPath()%>/js/directives/ui-jq.js"></script>
  <script src="<%=request.getContextPath()%>/js/directives/ui-module.js"></script>
  <script src="<%=request.getContextPath()%>/js/directives/ui-nav.js"></script>
  <script src="<%=request.getContextPath()%>/js/directives/ui-scroll.js"></script>
  <script src="<%=request.getContextPath()%>/js/directives/ui-shift.js"></script>
  <script src="<%=request.getContextPath()%>/js/directives/ui-toggleclass.js"></script>
  <script src="<%=request.getContextPath()%>/js/controllers/bootstrap.js"></script>
  <script src="<%=request.getContextPath()%>/libs/angular/angular-ui-select/dist/select.js"></script>
  <script src="<%=request.getContextPath()%>/js/common/directive.js"></script>
  <script src="<%=request.getContextPath()%>/js/app/datatables/datatables-angular.js"></script>
  <script src="<%=request.getContextPath()%>/js/app/bootbox/bootbox.min.js"></script>
  <script src="<%=request.getContextPath()%>/libs/angular/angularjs-toaster/toaster.js"></script>
<!-- endbuild -->
  <!-- Lazy loading -->
  
  
  <!-- modules controllers -->
  <script src="<%=request.getContextPath()%>/js/controllers/createQuoteController.js"></script>
  <script src="<%=request.getContextPath()%>/js/controllers/existingQuoteController.js"></script>
  <script src="<%=request.getContextPath()%>/js/controllers/itemPricingChangeController.js"></script>
  <script src="<%=request.getContextPath()%>/js/controllers/dashboardController.js"></script>
  <script src="<%=request.getContextPath()%>/js/services/restServices.js"></script>
  <script src="<%=request.getContextPath()%>/js/services/commonService.js"></script>
  <script src="<%=request.getContextPath()%>/js/common/constants.js"></script>
  <script src="<%=request.getContextPath()%>/js/common/bootstrap-datepicker.js"></script>
  
  <!-- end modules controllers -->
</body>
</html>
