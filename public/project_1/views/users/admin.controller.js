(function () {
    angular
        .module("ProjectApp")
        .controller("adminController", adminController);

    function adminController($rootScope, $scope, UserService) {

        var userlist = [];
        var allUsers = $rootScope.allUsers;
        for (var i = 0; i < allUsers.length; i++) {
            if (allUsers[i].username != $rootScope.newUser.username) {
                userlist.push(allUsers[i]);
            }
        }
        $scope.userList = userlist;

        $scope.deleteUser = deleteUser;

        function deleteUser(index) {
            UserService.deleteUserById($scope.userList[index]._id,
                function (response) {

                    var userlist = [];
                    var allUsers = response;
                    for (var i = 0; i < allUsers.length; i++) {
                        if (allUsers[i].username != $rootScope.newUser.username) {
                            userlist.push(allUsers[i]);
                        }
                    }
                    $scope.userList = userlist;

                });
        }

    }
})();