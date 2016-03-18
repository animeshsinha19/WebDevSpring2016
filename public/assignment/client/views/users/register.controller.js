(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, UserService) {

        var vm = this;
        vm.register = register;

        function register(user) {


            UserService
                .createUser(user)
                .then(function(response) {
                    $rootScope.newUser = user;
                    console.log(response);
                    $location.url("/profile");
                });
            //
            //var userBasicInfo = {
            //    name: vm.username,
            //    password: vm.userpass,
            //    email: vm.useremail
            //};
            //
            //UserService.createUser(
            //    userBasicInfo,
            //    function ($response) {
            //        $rootScope.newUser = $response;
            //
            //
            //    }
            //);




        }

    }
})();