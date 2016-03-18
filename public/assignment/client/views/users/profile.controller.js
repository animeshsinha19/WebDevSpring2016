(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService) {

        var vm = this;

        vm.update = update;

        function init() {
            var newUser = $rootScope.newUser;
            //console.log(newUser);
            //console.log($rootScope.newUser._id);
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
                    updatedUser)
                .then(function (response) {
                    $rootScope.newUser = updatedUser;
                    //console.log(response.data[response.data.length-1]);
                });


        }
    }
})();