(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {

        var users =
            [
                {
                    "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                    "username": "alice", "password": "alice", "roles": ["student"]
                },
                {
                    "_id": 234, "firstName": "Bob", "lastName": "Hope",
                    "username": "bob", "password": "bob", "roles": ["admin"]
                },
                {
                    "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                    "username": "charlie", "password": "charlie", "roles": ["faculty"]
                },
                {
                    "_id": 456, "firstName": "Dan", "lastName": "Craig",
                    "username": "dan", "password": "dan", "roles": ["faculty", "admin"]
                },
                {
                    "_id": 567, "firstName": "Edward", "lastName": "Norton",
                    "username": "ed", "password": "ed", "roles": ["student"]
                }
            ];


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

        function createUser(user, callback) {
            var newUser = {
                _id: (new Date).getTime(),
                firstName: "",
                lastName: "",
                username: user.name,
                password: user.password,
                roles: [],
                email: user.email
            };
            users.push(newUser);

            callback(newUser);

        }

        function deleteUserById(userId, callback) {

            console.log("in delete");

            for (var newuser in users) {
                if (newuser._id == userId) {
                    var index = users.indexOf(newuser);
                    users.splice(index, 1);
                    callback(users);
                    break;
                }
            }

        }

        function updateUser(userId, user, callback) {

            deleteUserById(userId, function ($response) {
                users = $response;
            });

            console.log(users);

            callback(user);

        }

        //function updateUser(userId, user, callback) {
        //    for (var newuser in users) {
        //        if (newuser._id == userId) {
        //            var index = users.indexOf(newuser);
        //            users.splice(index, 1);
        //            users.push(user);
        //            callback(user);
        //            break;
        //        }
        //
        //
        //    }
        //
        //}
    }
})();