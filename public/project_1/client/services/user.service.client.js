(function () {
    'use strict';
    angular
        .module("ProjectApp")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserById: findUserById



        };

        return api;


        function findUserById(userId) {
            return $http.get("/api/project_1/user/" + userId);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/project_1/user?username=" + username + "&password=" + password);
        }

        function findAllUsers() {

            return $http.get("/api/project_1/user");
        }

        function createUser(user) {

            return $http.post("/api/project_1/user", user);
        }

        function deleteUserById(userId) {

            return $http.delete("/api/project_1/user/" + userId);
        }

        function updateUser(userId, user) {

            return $http.put("/api/project_1/user/" + userId, user);

        }


    }

})();