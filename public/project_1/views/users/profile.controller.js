(function () {
    'use strict';
    angular
        .module("ProjectApp")
        .controller("profileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService) {

        $scope.update = update;

        var newUser = $rootScope.newUser;

        $scope.username = newUser.username;
        $scope.password = newUser.password;
        $scope.email = newUser.email;
        $scope.firstname = newUser.firstName;
        $scope.lastname = newUser.lastName;


        function update() {
            var updatedUser = {
                "_id": $rootScope.newUser._id,
                "username": $scope.username,
                "password": $scope.password,
                "email": $scope.email,
                "firstName": $scope.firstname,
                "lastName": $scope.lastname
            };

            UserService.updateUser(
                updatedUser._id,
                updatedUser,
                function ($response) {
                    $rootScope.newUser = $response;
                });


        }
    }
})();