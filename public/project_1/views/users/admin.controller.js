(function () {
    angular
        .module("ProjectApp")
        .controller("adminController",adminController);

    function adminController($rootScope,$scope,UserService) {

        var userlist = [];
        var allUsers = $rootScope.allUsers;
        for(var i=0;i<allUsers.length;i++) {
            if(allUsers[i].username != $rootScope.newUser.username) {
                userlist.push(allUsers[i]);
            }
        }
        $scope.userList = userlist;
    }
})();