(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, UserService) {

        var vm = this;

        function init() {
            vm.register = register;
        }
        init();

        function register(user) {

            UserService
                .createUser(user)
                .then(function(response) {
                    $rootScope.newUser = response.data;
                    //console.log(response.data);
                    //console.log(response.data[response.data.length-1]);
                    $location.url("/profile");
                });

        }

    }
})();