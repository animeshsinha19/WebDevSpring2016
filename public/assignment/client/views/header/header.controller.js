(function (){
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($rootScope,$scope) {
        $scope.logoutUser = logoutUser;

        function logoutUser() {
            $rootScope.newUser = null;
        }
    }
})();