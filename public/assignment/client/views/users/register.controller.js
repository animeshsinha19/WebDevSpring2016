(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, UserService) {

        var vm = this;
        vm.register = register;

        function init() {


        }

        init();

        function register(user) {


            UserService
                .createUser(user)
                .then(function(response) {
                    $rootScope.newUser = response.data[response.data.length-1];
                    //console.log(response.data[response.data.length-1]);
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