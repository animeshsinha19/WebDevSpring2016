(function () {
    'use strict';
    angular
        .module("ProjectApp")
        .controller("profileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService, $location) {

        var vm = this;

        function init() {
            vm.update = update;

            var newUser = $rootScope.newUser;

            //console.log(newUser);

            vm.username = newUser.username;
            vm.password = newUser.password;
            vm.email = newUser.email;
            vm.firstname = newUser.firstName;
            vm.lastname = newUser.lastName;

        }

        init();


        function update(user) {

            var updatedUser = {
                "_id": $rootScope.newUser._id,
                "username": user.username,
                "password": user.password,
                "email": user.email,
                "firstName": user.firstname,
                "lastName": user.lastname
            };


            UserService
                .updateUser(
                    updatedUser._id,
                    updatedUser
                )
                .then(function (response) {
                    $rootScope.newUser = response.data;
                    //console.log($rootScope.newUser);
                });

            $location.url("/home");
        }
    }
})();