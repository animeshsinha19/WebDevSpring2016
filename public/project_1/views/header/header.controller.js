(function (){
    'use strict';
    angular
        .module("ProjectApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($rootScope,$scope) {
        $scope.logoutUser = logoutUser;

        function logoutUser() {
            $rootScope.newUser = null;
        }
    }
})();