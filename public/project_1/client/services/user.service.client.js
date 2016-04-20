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
            findUserById: findUserById,

            followUser: followUser,
            unFollowUser: unFollowUser

        };

        return api;

        function unFollowUser(loggedInUserId, followId) {
            return $http.delete("/api/project_1/user/userloggedInId/" + loggedInUserId + "/followId/" + followId);
        }

        function followUser(loggedInUserId, followId) {
            return $http.get("/api/project_1/user/userloggedInId/" + loggedInUserId + "/followId/" + followId);
        }

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

            return $http.post("/api/project/user/userId/" + userId, user);

        }


    }

})();