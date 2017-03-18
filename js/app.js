// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('smrpg', ['ionic', 'smrpg.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}).config(function($compileProvider) {
		    // configure new 'compile' directive by passing a directive
		    // factory function. The factory function injects the '$compile'
		    $compileProvider.directive('compile', function($compile) {
		      // directive factory creates a link function
		      return function(scope, element, attrs) {
		        scope.$watch(
		          function(scope) {
		             // watch the 'compile' expression for changes
		            return scope.$eval(attrs.compile);
		          },
		          function(value) {
		            // when the 'compile' expression changes
		            // assign it into the current DOM
		            element.html(value);

		            // compile the new DOM and link it to the current
		            // scope.
		            // NOTE: we only compile .childNodes so that
		            // we don't get into infinite loop compiling ourselves
		            $compile(element.contents())(scope);
		          }
		        );
		      };
		    });
		  })

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "html/menu.html",
      controller: 'AppCtrl'
    })
    .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "html/home.html",
          controller: 'HomeCtrl'
        }
      }
    })

    .state('app.quiz', {
      url: "/tasks/1",
      views: {
        'menuContent' :{
          templateUrl: "html/quiz.html",
          controller: 'QuizCtrl'
        }
      }
    })

    .state('app.quizu', {
      url: "/tasks/9",
      views: {
        'menuContent' :{
          templateUrl: "html/quizu.html",
          controller: 'UQuizCtrl'
        }
      }
    })

    .state('app.jnames', {
      url: "/tasks/13",
      views: {
        'menuContent' :{
          templateUrl: "html/jnames.html",
          controller: 'JNamesCtrl'
        }
      }
    })

    .state('app.marathon', {
      url: "/tasks/2",
      views: {
        'menuContent' :{
          templateUrl: "html/marathon.html",
          controller: 'MarathonCtrl'
        }
      }
    })

    .state('app.solitaire', {
      url: "/tasks/3",
      views: {
        'menuContent' :{
          templateUrl: "html/solitaire.html",
          controller: 'SolitaireCtrl'
        }
      }
    })

    .state('app.coin', {
      url: "/tasks/4",
      views: {
        'menuContent' :{
          templateUrl: "html/coin.html",
          controller: 'CoinCtrl'
        }
      }
    })
    .state('app.item', {
      url: "/tasks/6",
      views: {
        'menuContent' :{
          templateUrl: "html/item.html",
          controller: 'ItemCtrl'
        }
      }
    })
    .state('app.kanji', {
      url: "/tasks/7",
      views: {
        'menuContent' :{
          templateUrl: "html/kanji.html",
          controller: 'KanjiCtrl'
        }
      }
    })
  .state('app.starhill', {
    url: "/tasks/10",
    views: {
      'menuContent' :{
        templateUrl: "html/starhill.html",
        controller: 'StarCtrl'
      }
    }
  })
  .state('app.levels', {
      url: "/tasks/11",
      views: {
        'menuContent' :{
          templateUrl: "html/levels.html",
          controller: 'LevelCtrl'
        }
      }
    })
    .state('app.menus', {
        url: "/tasks/12",
        views: {
          'menuContent' :{
            templateUrl: "html/menus.html",
            controller: 'MenusCtrl'
          }
        }
      })
  /*.state('app.menusim', {
      url: "/tasks/14",
      views: {
        'menuContent' :{
          templateUrl: "html/menusim.html",
          controller: 'MenuSimCtrl'
        }
      }
    })*/
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
