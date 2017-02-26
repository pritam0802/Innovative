'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }
    ]
  )
  .config(['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 'MODULE_CONFIG', 
      function ($stateProvider,   $urlRouterProvider, JQ_CONFIG, MODULE_CONFIG) {
          var layout = "pages/app.jsp";
          if(window.location.href.indexOf("material") > 0){
            layout = "pages/blocks/material.layout.jsp";
            $urlRouterProvider
              .otherwise('/app/dashboard-v3');
          }else{
            $urlRouterProvider
              .otherwise('/app/dashboard-v1');
          }
          
          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: layout
              })
              /*.state('app.dashboard-v1', {
                  url: '/dashboard-v1',
                  templateUrl: 'pages/app_dashboard_v1.jsp',
                  resolve: load(['js/controllers/chart.js'])
              })*/
              .state('app.dashboard-v2', {
                  url: '/dashboard-v2',
                  templateUrl: 'pages/app_dashboard_v2.jsp',
                  resolve: load(['js/controllers/chart.js'])
              })
              .state('app.dashboard-v3', {
                  url: '/dashboard-v3',
                  templateUrl: 'pages/app_dashboard_v3.jsp',
                  resolve: load(['js/controllers/chart.js'])
              })
              .state('app.ui', {
                  url: '/ui',
                  template: '<div ui-view class="fade-in-up"></div>'
              })
              .state('app.ui.buttons', {
                  url: '/buttons',
                  templateUrl: 'pages/ui_buttons.jsp'
              })
              .state('app.ui.icons', {
                  url: '/icons',
                  templateUrl: 'pages/ui_icons.jsp'
              })
              .state('app.ui.grid', {
                  url: '/grid',
                  templateUrl: 'pages/ui_grid.jsp'
              })
              .state('app.ui.widgets', {
                  url: '/widgets',
                  templateUrl: 'pages/ui_widgets.jsp'
              })          
              .state('app.ui.bootstrap', {
                  url: '/bootstrap',
                  templateUrl: 'pages/ui_bootstrap.jsp'
              })
              .state('app.ui.sortable', {
                  url: '/sortable',
                  templateUrl: 'pages/ui_sortable.jsp'
              })
              .state('app.ui.scroll', {
                  url: '/scroll',
                  templateUrl: 'pages/ui_scroll.jsp',
                  resolve: load('js/controllers/scroll.js')
              })
              .state('app.ui.portlet', {
                  url: '/portlet',
                  templateUrl: 'pages/ui_portlet.jsp'
              })
              .state('app.ui.timeline', {
                  url: '/timeline',
                  templateUrl: 'pages/ui_timeline.jsp'
              })
              .state('app.ui.tree', {
                  url: '/tree',
                  templateUrl: 'pages/ui_tree.jsp',
                  resolve: load(['angularBootstrapNavTree', 'js/controllers/tree.js'])
              })
              .state('app.ui.toaster', {
                  url: '/toaster',
                  templateUrl: 'pages/ui_toaster.jsp',
                  resolve: load(['toaster', 'js/controllers/toaster.js'])
              })
              .state('app.ui.jvectormap', {
                  url: '/jvectormap',
                  templateUrl: 'pages/ui_jvectormap.jsp',
                  resolve: load('js/controllers/vectormap.js')
              })
              .state('app.ui.googlemap', {
                  url: '/googlemap',
                  templateUrl: 'pages/ui_googlemap.jsp',
                  resolve: load(['js/app/map/load-google-maps.js', 'js/app/map/ui-map.js', 'js/app/map/map.js'], function(){ return loadGoogleMaps(); })
              })
              .state('app.chart', {
                  url: '/chart',
                  templateUrl: 'pages/ui_chart.jsp',
                  resolve: load('js/controllers/chart.js')
              })
              // table
              .state('app.table', {
                  url: '/table',
                  template: '<div ui-view></div>'
              })
              .state('app.table.static', {
                  url: '/static',
                  templateUrl: 'pages/table_static.jsp'
              })
              .state('app.table.datatable', {
                  url: '/datatable',
                  templateUrl: 'pages/table_datatable.jsp'
              })
              .state('app.table.footable', {
                  url: '/footable',
                  templateUrl: 'pages/table_footable.jsp'
              })
              .state('app.table.grid', {
                  url: '/grid',
                  templateUrl: 'pages/table_grid.jsp',
                  resolve: load(['ngGrid','js/controllers/grid.js'])
              })
              .state('app.table.uigrid', {
                  url: '/uigrid',
                  templateUrl: 'pages/table_uigrid.jsp',
                  resolve: load(['ui.grid','js/controllers/uigrid.js'])
              })
              .state('app.table.editable', {
                  url: '/editable',
                  templateUrl: 'pages/table_editable.jsp',
                  controller: 'XeditableCtrl',
                  resolve: load(['xeditable','js/controllers/xeditable.js'])
              })
              .state('app.table.smart', {
                  url: '/smart',
                  templateUrl: 'pages/table_smart.jsp',
                  resolve: load(['smart-table','js/controllers/table.js'])
              })
              // form
              .state('app.form', {
                  url: '/form',
                  template: '<div ui-view class="fade-in"></div>',
                  resolve: load('js/controllers/form.js')
              })
              .state('app.form.components', {
                  url: '/components',
                  templateUrl: 'pages/form_components.jsp',
                  resolve: load(['ngBootstrap','daterangepicker','js/controllers/form.components.js'])
              })
              .state('app.form.elements', {
                  url: '/elements',
                  templateUrl: 'pages/form_elements.jsp'
              })
              .state('app.form.validation', {
                  url: '/validation',
                  templateUrl: 'pages/form_validation.jsp'
              })
              .state('app.form.wizard', {
                  url: '/wizard',
                  templateUrl: 'pages/form_wizard.jsp'
              })
              .state('app.form.fileupload', {
                  url: '/fileupload',
                  templateUrl: 'pages/form_fileupload.jsp',
                  resolve: load(['angularFileUpload','js/controllers/file-upload.js'])
              })
              .state('app.form.imagecrop', {
                  url: '/imagecrop',
                  templateUrl: 'pages/form_imagecrop.jsp',
                  resolve: load(['ngImgCrop','js/controllers/imgcrop.js'])
              })
              .state('app.form.select', {
                  url: '/select',
                  templateUrl: 'pages/form_select.jsp',
                  controller: 'SelectCtrl',
                  resolve: load(['ui.select','js/controllers/select.js'])
              })
              .state('app.form.slider', {
                  url: '/slider',
                  templateUrl: 'pages/form_slider.jsp',
                  controller: 'SliderCtrl',
                  resolve: load(['vr.directives.slider','js/controllers/slider.js'])
              })
              .state('app.form.editor', {
                  url: '/editor',
                  templateUrl: 'pages/form_editor.jsp',
                  controller: 'EditorCtrl',
                  resolve: load(['textAngular','js/controllers/editor.js'])
              })
              .state('app.form.xeditable', {
                  url: '/xeditable',
                  templateUrl: 'pages/form_xeditable.jsp',
                  controller: 'XeditableCtrl',
                  resolve: load(['xeditable','js/controllers/xeditable.js'])
              })
              // pages
              .state('app.page', {
                  url: '/page',
                  template: '<div ui-view class="fade-in-down"></div>'
              })
              .state('app.page.profile', {
                  url: '/profile',
                  templateUrl: 'pages/page_profile.jsp'
              })
              .state('app.page.post', {
                  url: '/post',
                  templateUrl: 'pages/page_post.jsp'
              })
              .state('app.page.search', {
                  url: '/search',
                  templateUrl: 'pages/page_search.jsp'
              })
              .state('app.page.invoice', {
                  url: '/invoice',
                  templateUrl: 'pages/page_invoice.jsp'
              })
              .state('app.page.price', {
                  url: '/price',
                  templateUrl: 'pages/page_price.jsp'
              })
              .state('app.docs', {
                  url: '/docs',
                  templateUrl: 'pages/docs.jsp'
              })
              // others
              .state('lockme', {
                  url: '/lockme',
                  templateUrl: 'pages/page_lockme.jsp'
              })
              .state('access', {
                  url: '/access',
                  template: '<div ui-view class="fade-in-right-big smooth"></div>'
              })
              .state('access.signin', {
                  url: '/signin',
                  templateUrl: 'pages/signin.jsp',
                  resolve: load( ['js/controllers/signin.js'] )
              })
              .state('access.signup', {
                  url: '/signup',
                  templateUrl: 'pages/page_signup.jsp',
                  resolve: load( ['js/controllers/signup.js'] )
              })
              .state('access.forgotpwd', {
                  url: '/forgotpwd',
                  templateUrl: 'pages/page_forgotpwd.jsp'
              })
              .state('access.404', {
                  url: '/404',
                  templateUrl: 'pages/page_404.jsp'
              })

              // fullCalendar
              .state('app.calendar', {
                  url: '/calendar',
                  templateUrl: 'pages/app_calendar.jsp',
                  // use resolve to load other dependences
                  resolve: load(['moment','fullcalendar','ui.calendar','js/app/calendar/calendar.js'])
              })

              // mail
              .state('app.mail', {
                  abstract: true,
                  url: '/mail',
                  templateUrl: 'pages/mail.jsp',
                  // use resolve to load other dependences
                  resolve: load( ['js/app/mail/mail.js','js/app/mail/mail-service.js','moment'] )
              })
              .state('app.mail.list', {
                  url: '/inbox/{fold}',
                  templateUrl: 'pages/mail.list.jsp'
              })
              .state('app.mail.detail', {
                  url: '/{mailId:[0-9]{1,4}}',
                  templateUrl: 'pages/mail.detail.jsp'
              })
              .state('app.mail.compose', {
                  url: '/compose',
                  templateUrl: 'pages/mail.new.jsp'
              })

              .state('layout', {
                  abstract: true,
                  url: '/layout',
                  templateUrl: 'pages/layout.jsp'
              })
              .state('layout.fullwidth', {
                  url: '/fullwidth',
                  views: {
                      '': {
                          templateUrl: 'pages/layout_fullwidth.jsp'
                      },
                      'footer': {
                          templateUrl: 'pages/layout_footer_fullwidth.jsp'
                      }
                  },
                  resolve: load( ['js/controllers/vectormap.js'] )
              })
              .state('layout.mobile', {
                  url: '/mobile',
                  views: {
                      '': {
                          templateUrl: 'pages/layout_mobile.jsp'
                      },
                      'footer': {
                          templateUrl: 'pages/layout_footer_mobile.jsp'
                      }
                  }
              })
              .state('layout.app', {
                  url: '/app',
                  views: {
                      '': {
                          templateUrl: 'pages/layout_app.jsp'
                      },
                      'footer': {
                          templateUrl: 'pages/layout_footer_fullwidth.jsp'
                      }
                  },
                  resolve: load( ['js/controllers/tab.js'] )
              })
              .state('apps', {
                  abstract: true,
                  url: '/apps',
                  templateUrl: 'pages/layout.jsp'
              })
              .state('apps.note', {
                  url: '/note',
                  templateUrl: 'pages/apps_note.jsp',
                  resolve: load( ['js/app/note/note.js','moment'] )
              })
              .state('apps.contact', {
                  url: '/contact',
                  templateUrl: 'pages/apps_contact.jsp',
                  resolve: load( ['js/app/contact/contact.js'] )
              })
              .state('app.weather', {
                  url: '/weather',
                  templateUrl: 'pages/apps_weather.jsp',
                  resolve: load(['js/app/weather/skycons.js','angular-skycons','js/app/weather/ctrl.js','moment'])
              })
              .state('app.todo', {
                  url: '/todo',
                  templateUrl: 'pages/apps_todo.jsp',
                  resolve: load(['js/app/todo/todo.js', 'moment'])
              })
              .state('app.todo.list', {
                  url: '/{fold}'
              })
              .state('app.note', {
                  url: '/note',
                  templateUrl: 'pages/apps_note_material.jsp',
                  resolve: load(['js/app/note/note.js', 'moment'])
              })
              .state('music', {
                  url: '/music',
                  templateUrl: 'pages/music.jsp',
                  controller: 'MusicCtrl',
                  resolve: load([
                            'com.2fdevs.videogular', 
                            'com.2fdevs.videogular.plugins.controls', 
                            'com.2fdevs.videogular.plugins.overlayplay',
                            'com.2fdevs.videogular.plugins.poster',
                            'com.2fdevs.videogular.plugins.buffering',
                            'js/app/music/ctrl.js', 
                            'js/app/music/theme.css'
                          ])
              })
                  .state('music.home', {
                      url: '/home',
                      templateUrl: 'pages/music.home.jsp'
                  })
                  .state('music.genres', {
                      url: '/genres',
                      templateUrl: 'pages/music.genres.jsp'
                  })
                  .state('music.detail', {
                      url: '/detail',
                      templateUrl: 'pages/music.detail.jsp'
                  })
                  .state('music.mtv', {
                      url: '/mtv',
                      templateUrl: 'pages/music.mtv.jsp'
                  })
                  .state('music.mtvdetail', {
                      url: '/mtvdetail',
                      templateUrl: 'pages/music.mtv.detail.jsp'
                  })
                  .state('music.playlist', {
                      url: '/playlist/{fold}',
                      templateUrl: 'pages/music.playlist.jsp'
                  })
              .state('app.material', {
                  url: '/material',
                  template: '<div ui-view class="wrapper-md"></div>',
                  resolve: load(['js/controllers/material.js'])
                })
                .state('app.material.button', {
                  url: '/button',
                  templateUrl: 'pages/material/button.jsp'
                })
                .state('app.material.color', {
                  url: '/color',
                  templateUrl: 'pages/material/color.jsp'
                })
                .state('app.material.icon', {
                  url: '/icon',
                  templateUrl: 'pages/material/icon.jsp'
                })
                .state('app.material.card', {
                  url: '/card',
                  templateUrl: 'pages/material/card.jsp'
                })
                .state('app.material.form', {
                  url: '/form',
                  templateUrl: 'pages/material/form.jsp'
                })
                .state('app.material.list', {
                  url: '/list',
                  templateUrl: 'pages/material/list.jsp'
                })
                .state('app.material.ngmaterial', {
                  url: '/ngmaterial',
                  templateUrl: 'pages/material/ngmaterial.jsp'
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


      }
    ]
  );