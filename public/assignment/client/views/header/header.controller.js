(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $scope, UserService, $location) {
        $scope.logoutUser = logoutUser;

        function logoutUser() {

            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.newUser = null;
                        $location.url("/login");
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }
    }
})();