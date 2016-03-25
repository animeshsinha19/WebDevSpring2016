(function () {
    'use strict';
    angular
        .module("ProjectApp")
        .controller("registerController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {

        var vm = this;

        function init() {
            vm.register = register;
        }

        init();

        function register(user) {

            var userBasicInfo = {
                name: user.username,
                password: user.userpass,
                email: user.useremail
            };

            UserService
                .createUser(userBasicInfo)
                .then(function (response) {
                    $rootScope.newUser = response.data;
                });

            $location.url("/profile");
        }

    }
})();