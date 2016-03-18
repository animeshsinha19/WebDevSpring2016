(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http) {


        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return api;


        function findUserByCredentials(username, password) {
            return $http.get("/api/assignment/user?username="+username+"&password="+password);
        }

        function findAllUsers(callback) {

            callback(users);
        }

        function createUser(user) {

            return $http.post("/api/assignment/user", user);
        }

        function deleteUserById(userId, callback) {

            for (var i = 0; i < users.length; i++) {
                if (users[i]._id == userId) {
                    users.splice(i, 1);
                    callback(users);
                    break;
                }
            }

        }

        function updateUser(userId, user) {

            return $http.put("/api/assignment/user/" + userId, user);

        }


    }
})();