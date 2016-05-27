angular.module('sample.auth', [])

.controller('AuthCtrl', function($scope, $ionicModal, $ionicPopup, $timeout, $state, $auth, $window, $http) {
  // Form data for the login modal
  $scope.loginData = {};
  $scope.registerData = {};
  $scope.userData = $auth.user;

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
    $auth.submitRegistration($scope.registerData)
      .then(function(resp) { 
        $scope.modal.hide();
      })
      .catch(function(resp) { 
        var alertPopup = $ionicPopup.alert({
            title: 'Error al registrar el Usuario!',
            template: 'Verifica que los datos son correctos!'
        });
      });
  };

  $scope.updateUser = function() {
    console.log("update User");
    console.log($scope.userData);

    /*var req = {
     method: 'POST',
     url: 'http://localhost:3000/api/v1/users.json',
     headers: {
       'Content-Type': undefined
     },
     data: $scope.userData
    }

    //$http(req).success(function(data) {
    //    console.log(data);
    //});
    */

    /*$http.put("http://localhost:3000/api/v1/users/1/edit.json", $scope.userData).success(function(result) {
        console.log(result);
        //$scope.resultPut = result;
    }).error(function() {
        console.log("error");
    });*/



    $auth.updateAccount($scope.userData)
      .then(function(resp) { 
        console.log(resp.data.data);
        $scope.userData = resp.data.data;
        //$window.location.reload(true)
        //$state.go('tab.account');
        //$state.go('/register');
      })
      .catch(function(resp) { 
        var alertPopup = $ionicPopup.alert({
            title: 'Error al guardar datos!',
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


