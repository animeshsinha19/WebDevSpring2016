(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService) {

        $scope.update = update;

        var newUser = $rootScope.newUser;

        $scope.username = newUser.username;
        $scope.password = newUser.password;
        $scope.email = newUser.email;
        $scope.firstname = newUser.firstName;
        $scope.lastname = newUser.lastName;


        function update() {
            newUser.username = $scope.username;
            newUser.password = $scope.password;
            newUser.email = $scope.email;

            newUser.firstName = $scope.firstname;
            newUser.lastName = $scope.lastname;

            UserService.updateUser(
                newUser._id,
                newUser,
                function ($response) {
                    $rootScope.newUser = $response;
                });

        }
    }
})();