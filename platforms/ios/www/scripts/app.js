angular.module('sample', ['ionic', 
  'config',
  'sample.auth',
  'sample.home',
  'ng-token-auth',
  'ngResource'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($authProvider, ENV) {
  $authProvider.configure({
    apiUrl: ENV.apiEndpoint
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Tabs
  .state('tab.points', {
    url: '/points',
    views: {
      'tab-points': {
        templateUrl: 'templates/tab-points.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.games', {
    url: '/games',
    views: {
      'tab-games': {
        templateUrl: 'templates/tab-games.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AuthCtrl'
      }
    }
  })

  .state('tab.logout', {
    url: '/logout',
    views: {
      'tab-logout': {
        templateUrl: 'templates/register.html',
        controller: 'AuthCtrl'
      }
    }
  })

  // Tabs

  .state('app.register', {
    url: "/register",
    abstract: true,
    templateUrl: "templates/register.html",
    controller: 'AuthCtrl'
  })

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AuthCtrl'
  })

  .state('app.top', {
    url: "/top",
    views: {
      'menuContent': {
        templateUrl: "templates/top.html"
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
});
