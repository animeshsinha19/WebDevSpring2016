(function () {
    angular
        .module("ProjectApp")
        .controller("adminController", adminController);

    function adminController($rootScope, $scope, UserService) {
        var vm = this;

        function init() {

            // initialize event handlers
            vm.deleteUser = deleteUser;

            UserService
                .findAllUsers()
                .then(function (response) {
                    createListOfUsersForView(response.data);
                });
        }

        init();

        function deleteUser(index) {

            UserService
                .deleteUserById(vm.userList[index]._id)
                .then(function (response) {
                    createListOfUsersForView(response.data);
                });
        }

        function createListOfUsersForView(allUsers) {
            // get a list of all users
            var userlist = [];

            // find and push all users except the current logged in admin user
            for (var i = 0; i < allUsers.length; i++) {
                if (allUsers[i].username != $rootScope.newUser.username) {
                    userlist.push(allUsers[i]);
                }
            }
            vm.userList = userlist;
        }

    }
})();