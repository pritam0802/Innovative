// lazyload config
angular.module('app')
    /**
   * jQuery plugin config use ui-jq directive , config the js and css files that required
   * key: function name of the jQuery plugin
   * value: array of the css js file located
   */
  .constant('JQ_CONFIG', {
      easyPieChart:   [   CONTEXT_PATH+'/libs/jquery/jquery.easy-pie-chart/dist/jquery.easypiechart.fill.js'],
      sparkline:      [   CONTEXT_PATH+'/libs/jquery/jquery.sparkline/dist/jquery.sparkline.retina.js'],
      plot:           [   CONTEXT_PATH+'/libs/jquery/flot/jquery.flot.js',
                          CONTEXT_PATH+'/libs/jquery/flot/jquery.flot.pie.js', 
                          CONTEXT_PATH+'/libs/jquery/flot/jquery.flot.resize.js',
                          CONTEXT_PATH+'/libs/jquery/flot.tooltip/js/jquery.flot.tooltip.min.js',
                          CONTEXT_PATH+'/libs/jquery/flot.orderbars/js/jquery.flot.orderBars.js',
                          CONTEXT_PATH+'/libs/jquery/flot-spline/js/jquery.flot.spline.min.js'],
      moment:         [   CONTEXT_PATH+'/libs/jquery/moment/moment.js'],
      screenfull:     [   CONTEXT_PATH+'/libs/jquery/screenfull/dist/screenfull.min.js'],
      slimScroll:     [   CONTEXT_PATH+'/libs/jquery/slimscroll/jquery.slimscroll.min.js'],
      sortable:       [   CONTEXT_PATH+'/libs/jquery/html5sortable/jquery.sortable.js'],
      nestable:       [   CONTEXT_PATH+'/libs/jquery/nestable/jquery.nestable.js',
                          CONTEXT_PATH+'/libs/jquery/nestable/jquery.nestable.css'],
      filestyle:      [   CONTEXT_PATH+'/libs/jquery/bootstrap-filestyle/src/bootstrap-filestyle.js'],
      slider:         [   CONTEXT_PATH+'/libs/jquery/bootstrap-slider/bootstrap-slider.js',
                          CONTEXT_PATH+'/libs/jquery/bootstrap-slider/bootstrap-slider.css'],
      chosen:         [   CONTEXT_PATH+'/libs/jquery/chosen/chosen.jquery.min.js',
                          CONTEXT_PATH+'/libs/jquery/chosen/bootstrap-chosen.css'],
      TouchSpin:      [   CONTEXT_PATH+'/libs/jquery/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js',
                          CONTEXT_PATH+'/libs/jquery/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css'],
      wysiwyg:        [   CONTEXT_PATH+'/libs/jquery/bootstrap-wysiwyg/bootstrap-wysiwyg.js',
                          CONTEXT_PATH+'/libs/jquery/bootstrap-wysiwyg/external/jquery.hotkeys.js'],
      dataTable:      [   CONTEXT_PATH+'/libs/jquery/datatables/media/js/jquery.dataTables.min.js',
                          CONTEXT_PATH+'/libs/jquery/plugins/integration/bootstrap/3/dataTables.bootstrap.js',
                          CONTEXT_PATH+'/libs/jquery/plugins/integration/bootstrap/3/dataTables.bootstrap.css'],
      vectorMap:      [   CONTEXT_PATH+'/libs/jquery/bower-jvectormap/jquery-jvectormap-1.2.2.min.js', 
                          CONTEXT_PATH+'/libs/jquery/bower-jvectormap/jquery-jvectormap-world-mill-en.js',
                          CONTEXT_PATH+'/libs/jquery/bower-jvectormap/jquery-jvectormap-us-aea-en.js',
                          CONTEXT_PATH+'/libs/jquery/bower-jvectormap/jquery-jvectormap.css'],
      footable:       [   CONTEXT_PATH+'/libs/jquery/footable/v3/js/footable.min.js',
                          CONTEXT_PATH+'/libs/jquery/footable/v3/css/footable.bootstrap.min.css'],
      fullcalendar:   [   CONTEXT_PATH+'/libs/jquery/moment/moment.js',
                          CONTEXT_PATH+'/libs/jquery/fullcalendar/dist/fullcalendar.min.js',
                          CONTEXT_PATH+'/libs/jquery/fullcalendar/dist/fullcalendar.css',
                          CONTEXT_PATH+'/libs/jquery/fullcalendar/dist/fullcalendar.theme.css'],
      daterangepicker:[   CONTEXT_PATH+'/libs/jquery/moment/moment.js',
                          CONTEXT_PATH+'/libs/jquery/bootstrap-daterangepicker/daterangepicker.js',
                          CONTEXT_PATH+'/libs/jquery/bootstrap-daterangepicker/daterangepicker-bs3.css'],
      tagsinput:      [   CONTEXT_PATH+'/libs/jquery/bootstrap-tagsinput/dist/bootstrap-tagsinput.js',
                          CONTEXT_PATH+'/libs/jquery/bootstrap-tagsinput/dist/bootstrap-tagsinput.css']
                      
    }
  )
  .constant('MODULE_CONFIG', [
      {
          name: 'ngGrid',
          files: [
              CONTEXT_PATH+'/libs/angular/ng-grid/build/ng-grid.min.js',
              CONTEXT_PATH+'/libs/angular/ng-grid/ng-grid.min.css',
              CONTEXT_PATH+'/libs/angular/ng-grid/ng-grid.bootstrap.css'
          ]
      },
      {
          name: 'ui.grid',
          files: [
              CONTEXT_PATH+'/libs/angular/angular-ui-grid/ui-grid.min.js',
              CONTEXT_PATH+'/libs/angular/angular-ui-grid/ui-grid.min.css',
              CONTEXT_PATH+'/libs/angular/angular-ui-grid/ui-grid.bootstrap.css'
          ]
      },
      {
          name: 'ui.select',
          files: [
              CONTEXT_PATH+'/libs/angular/angular-ui-select/dist/select.min.js',
              CONTEXT_PATH+'/libs/angular/angular-ui-select/dist/select.min.css'
          ]
      },
      {
          name:'angularFileUpload',
          files: [
            CONTEXT_PATH+'/libs/angular/angular-file-upload/angular-file-upload.js'
          ]
      },
      {
          name:'ui.calendar',
          files: [CONTEXT_PATH+'/libs/angular/angular-ui-calendar/src/calendar.js']
      },
      {
          name: 'ngImgCrop',
          files: [
              CONTEXT_PATH+'/libs/angular/ngImgCrop/compile/minified/ng-img-crop.js',
              CONTEXT_PATH+'/libs/angular/ngImgCrop/compile/minified/ng-img-crop.css'
          ]
      },
      {
          name: 'angularBootstrapNavTree',
          files: [
              CONTEXT_PATH+'/libs/angular/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
              CONTEXT_PATH+'/libs/angular/angular-bootstrap-nav-tree/dist/abn_tree.css'
          ]
      },
      {
          name: 'toaster',
          files: [
              CONTEXT_PATH+'/libs/angular/angularjs-toaster/toaster.js',
              CONTEXT_PATH+'/libs/angular/angularjs-toaster/toaster.css'
          ]
      },
      {
          name: 'textAngular',
          files: [
              CONTEXT_PATH+'/libs/angular/textAngular/dist/textAngular-sanitize.min.js',
              CONTEXT_PATH+'/libs/angular/textAngular/dist/textAngular.min.js'
          ]
      },
      {
          name: 'vr.directives.slider',
          files: [
              CONTEXT_PATH+'/libs/angular/venturocket-angular-slider/build/angular-slider.min.js',
              CONTEXT_PATH+'/libs/angular/venturocket-angular-slider/build/angular-slider.css'
          ]
      },
      {
          name: 'com.2fdevs.videogular',
          files: [
              CONTEXT_PATH+'/libs/angular/videogular/videogular.min.js'
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.controls',
          files: [
              CONTEXT_PATH+'/libs/angular/videogular-controls/controls.min.js'
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.buffering',
          files: [
              CONTEXT_PATH+'/libs/angular/videogular-buffering/buffering.min.js'
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.overlayplay',
          files: [
              CONTEXT_PATH+'/libs/angular/videogular-overlay-play/overlay-play.min.js'
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.poster',
          files: [
              CONTEXT_PATH+'/libs/angular/videogular-poster/poster.min.js'
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.imaads',
          files: [
              CONTEXT_PATH+'/libs/angular/videogular-ima-ads/ima-ads.min.js'
          ]
      },
      {
          name: 'xeditable',
          files: [
              CONTEXT_PATH+'/libs/angular/angular-xeditable/dist/js/xeditable.min.js',
              CONTEXT_PATH+'/libs/angular/angular-xeditable/dist/css/xeditable.css'
          ]
      },
      {
          name: 'smart-table',
          files: [
              CONTEXT_PATH+'/libs/angular/angular-smart-table/dist/smart-table.min.js'
          ]
      },
      {
          name: 'angular-skycons',
          files: [
              CONTEXT_PATH+'/libs/angular/angular-skycons/angular-skycons.js'
          ]
      }
    ]
  )
  // oclazyload config
  .config(['$ocLazyLoadProvider', 'MODULE_CONFIG', function($ocLazyLoadProvider, MODULE_CONFIG) {
      // We configure ocLazyLoad to use the lib script.js as the async loader
      $ocLazyLoadProvider.config({
          debug:  false,
          events: true,
          modules: MODULE_CONFIG
      });
  }])
;
