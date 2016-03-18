(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($location, $rootScope, UserService) {

        var vm = this;

        vm.login = login;

        function login(user) {
            //var user;
            UserService
                .findUserByCredentials(
                    user.username,
                    user.password)

                .then(function (response) {
                    //console.log(response);
                    if(response.data) {
                        $rootScope.newUser = response.data;
                        $location.url("/profile");
                    } else {
                        vm.error = "Invalid credentials";
                    }

                });

            //function ($response) {
            //   user = $response;
            //    $rootScope.newUser = user;
            //});




        }


    }
})();