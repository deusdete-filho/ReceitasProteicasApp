angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }


var admobid = {};

// TODO: replace the following ad units with your own
if( /(android)/i.test(navigator.userAgent) ) {
  admobid = { // for Android
    banner: 'AD_UNIT_ID_BANNER',
    interstitial: 'AD_UNIT_ID_INTERSTICIAL'
  };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
  admobid = { // for iOS
    banner: 'AD_UNIT_ID_BANNER',
    interstitial: 'AD_UNIT_ID_INTERSTICIAL'
  };
}

function initApp() {
  if (! AdMob ) { alert( 'admob plugin not ready' ); return; }

  // this will create a banner on startup
  AdMob.createBanner( {
    adId: admobid.banner,
    position: AdMob.AD_POSITION.BOTTOM_CENTER,
    isTesting: false, // TODO: remove this line when release
    overlap: false,
    offsetTopBar: false,
    bgColor: 'purple'
  } );

  // this will load a full screen ad on startup
  AdMob.prepareInterstitial({
    adId: admobid.interstitial,
    isTesting: false, // TODO: remove this line when release
    autoShow: true
  });
}

if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
    document.addEventListener('deviceready', initApp, false);
} else {
    initApp();
}

});

})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider){

$ionicConfigProvider.tabs.position("top");
$ionicConfigProvider.navBar.alignTitle("center");

$stateProvider

     .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'tab.html'
    })

     .state('tab.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'home.html',
            controller: 'RecetasCtrl'
          }
        }
      })

     .state('tab.about', {
        url: '/about',
        views: {
          'tab-about': {
            templateUrl: 'about.html',
            controller: 'RecetasCtrl'
          }
        }
      })

      .state('tab.details', {
        url: '/details/:id',
        views: {
          'tab-details': {
            templateUrl: 'details.html',
            controller: 'DetailsCtrl'
          }
        }
      })

    .state('tab.search', {
        url: '/search',
        views: {
          'tab-search': {
            templateUrl: 'search.html',
            controller: 'SearchCtrl'
          }
        }
      })

    .state('tab.categories', {
        url: '/categories',
        views: {
          'tab-categories': {
            templateUrl: 'categories.html',
            controller: 'CategoriesCtrl'
          }
        }
      })

.state('tab.category', {
        url: '/category/:category',
        views: {
          'tab-category': {
            templateUrl: 'category.html',
            controller: 'CategoryCtrl'
          }
        }
      })

    .state('tab.chefs', {
        url: '/listchefs',
        views: {
          'tab-chefs': {
            templateUrl: 'chefs.html',
            controller: 'ChefsCtrl'
          }
        }
      })

    .state('tab.profile', {
        url: '/profile/:chef',
        views: {
          'tab-profile': {
            templateUrl: 'profile.html',
            controller: 'ChefCtrl'
          }
        }
      })

    .state('tab.chef', {
        url: '/chef/:chef',
        views: {
          'tab-chef': {
            templateUrl: 'chef.html',
            controller: 'ChefCtrl'
          }
        }
      })

$urlRouterProvider.otherwise('/tab/home');})

.filter('unique', function() {

   return function(collection, keyname) {
      var output = [],
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });
      return output;
   };
})


.controller('RecetasCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  $http.get('data/recipes.json')
  .success(function(data){
    $scope.recipes = data.recipes;
    $scope.data = data.recipes[$state.params.id];
  });

}])


.controller('CategoriesCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  $http.get('data/recipes.json')
  .success(function(data){
    $scope.recipes = data.recipes;
  });

}])

.controller('CategoryCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
 $scope.params = $state.params ;
  $http.get('data/recipes.json')
  .success(function(data){
    $scope.recipes = data.recipes;
    //$scope.data = data.recipes[$state.category];

    });

  $http.get('data/categories.json')
  .success(function(data){
    $scope.data = data.categories[$state.params.id];
    $scope.categories = data.categories;
  });

}])

.controller('ChefsCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  $http.get('data/recipes.json')
  .success(function(data){
    $scope.recipes = data.recipes;
  });

}])

.controller('ChefCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {

  $scope.params = $state.params ;
  $http.get('data/recipes.json')
  .success(function(data){
    $scope.recipes = data.recipes;
    //$scope.data = data.recipes[$state.chef];

    });

    $http.get('data/chefs.json')
  .success(function(data){
    $scope.data = data.chefs[$state.params.id];
    $scope.chefs = data.chefs;
  });

}])

.controller('DetailsCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  $http.get('data/recipes.json')
  .success(function(data){
    $scope.data = data.recipes[$state.params.id];
    $scope.recipes = data.recipes;
  });

  $http.get('data/chefs.json')
  .success(function(data){
    $scope.chefs = data.chefs;
  });

  }])

  .controller('SearchCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  $http.get('data/recipes.json')
  .success(function(data){
    $scope.data = data.recipes[$state.params.id];
    $scope.recipes = data.recipes;
  });

  $http.get('data/chefs.json')
  .success(function(data){
    $scope.chefs = data.chefs;
  });

}])
