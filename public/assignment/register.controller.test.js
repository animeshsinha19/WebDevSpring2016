(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {

        $scope.register = register;

        function register() {

            var userBasicInfo = {
                name: $scope.username,
                password: $scope.userpass,
                email: $scope.useremail
            };

            UserService.createUser(
                userBasicInfo,
                function ($response) {
                    $rootScope.newUser = $response;

                }
            );



            $location.url("/profile");
        }

    }
})();