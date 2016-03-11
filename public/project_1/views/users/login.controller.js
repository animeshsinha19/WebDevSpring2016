(function () {
    'use strict';
    angular
        .module("ProjectApp")
        .controller("loginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {

        $scope.login = login;

        function login() {
            var user;
            UserService.findUserByCredentials(
                $scope.username,
                $scope.password,
                function ($responseUser, $admin) {
                    user = $responseUser;
                    if ($admin != "NA") {
                        $rootScope.newUser = user;
                        $rootScope.allUsers = $admin;
                    } else {
                        $rootScope.newUser = user;
                    }

                });

            if ($rootScope.newUser)
                $location.url("/search");
            else {
                $scope.error = "Invalid username or password";
            }

        }


    }
})();