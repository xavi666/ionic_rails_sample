angular.module('sample.auth', [])

.controller('AuthCtrl', function($scope, $ionicModal, $ionicPopup, $timeout, $state, $auth) {
  // Form data for the login modal
  $scope.loginData = {};
  $scope.registerData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.register = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    $auth.submitLogin($scope.loginData)
      .then(function(resp) { 
        console.log(resp)
        //localstorage.setItem('loggin_state', 'autheticate');
        //localstorage.setItem('user', resp);
        $state.go('tab.points');
      })
      .catch(function(resp) { 
        console.log(resp);
        var alertPopup = $ionicPopup.alert({
            title: 'Error al entrar!',
            template: 'Verifica que el email y la contraseña son correctos!'
        });
      });
  };


  $scope.registerUser = function() {
    console.log("--------> registerUser")
    console.log($scope.registerData);
    $auth.submitRegistration($scope.registerData)
      .then(function(resp) { 
        console.log(resp)
        //localstorage.setItem('loggin_state', 'autheticate');
        //localstorage.setItem('user', resp);
        //$state.go('tab.points');
      })
      .catch(function(resp) { 
        console.log(resp);
        var alertPopup = $ionicPopup.alert({
            title: 'Error al registrar el Usuario!',
            template: 'Verifica que los datos son correctos!'
        });
      });
  };


  $scope.logout = function() {
    $ionicLoading.show({template:'Logging out....'});
    $localstorage.set('loggin_state', '');

    $timeout(function () {
        $ionicLoading.hide();
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
        $state.go('/register');
        }, 30);
    };
});


