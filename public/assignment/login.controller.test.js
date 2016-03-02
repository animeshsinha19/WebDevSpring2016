(function () {

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {

        $scope.login = login;

        function login() {
            var user;
            UserService.findUserByCredentials(
                $scope.username,
                $scope.password,
                function ($response) {
                   user = $response;
                });
            $rootScope.newUser = user;

            $location.url("/profile");

        }


    }
})();