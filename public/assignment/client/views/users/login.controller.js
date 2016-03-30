(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($location, $rootScope, UserService) {

        var vm = this;

        function init() {
            vm.login = login;
        }
        init();


        function login(user) {

            UserService
                .findUserByCredentials(
                    user.username,
                    user.password)

                .then(function (response) {
                    //console.log(response);
                    if(response.data) {
                        $rootScope.newUser = response.data[0];
                        //console.log(response.data[0]);
                        $location.url("/profile");
                    } else {
                        vm.error = "Invalid credentials";
                    }

                });


        }


    }
})();