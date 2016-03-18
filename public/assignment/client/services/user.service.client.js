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


        function findUserByCredentials(username, password, callback) {
            var flag = false; //,admin = false;
            for (var i = 0; i < users.length; i++) {
                if (users[i].username == username && users[i].password == password) {
                    flag = true;

                    callback(users[i]);
                    break;
                }
            }
            if (!flag) {
                callback(null);
            }
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

        function updateUser(userId, user, callback) {
            //console.log("before:");
            //console.log(users);

            //deleteUserById(userId, function ($response) {
            //    users = $response;
            //
            //});
            //

            //users.push(user);

            //console.log("after:");
            //console.log(users);

            //callback(user);

            for (var i = 0; i < users.length; i++) {
                if (users[i]._id == userId) {
                    users[i].username = user.username;
                    users[i].password = user.password;
                    users[i].email = user.email;
                    users[i].firstName = user.firstName;
                    users[i].lastName = user.lastName;
                    callback(users[i]);
                    break;
                }
            }
        }


    }
})();