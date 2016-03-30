(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService) {

        var vm = this;

        function init() {

            vm.update = update;

            var newUser = $rootScope.newUser;
            //console.log(newUser);
            //console.log($rootScope.newUser._id);
            vm.username = newUser.username;
            vm.password = newUser.password;
            vm.email = newUser.emails[0];
            vm.firstname = newUser.firstName;
            vm.lastname = newUser.lastName;
        }

        init();

        function update(user) {
            var userId = $rootScope.newUser._id;
            var updatedUser = {
                "username": user.username,
                "password": user.password,
                "emails": [user.email],
                "firstName": user.firstname,
                "lastName": user.lastname
            };
            console.log("controller");
            UserService
                .updateUser(
                    userId,
                    updatedUser)
                .then(function (response) {

                    console.log("inside then");
                    $rootScope.newUser = response.data[0];
                    console.log(response.data[0]);
                });


        }
    }
})();