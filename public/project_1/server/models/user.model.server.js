var mockUsers = require("./users.mockdata.json");

module.exports = function () {

    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser
    };

    return api;


    function findUserByCredentials(username, password) {
        //var flag = false; //,admin = false;
        for (var i = 0; i < mockUsers.length; i++) {
            if (mockUsers[i].username == username && mockUsers[i].password == password) {
                //flag = true;
                return mockUsers[i];
            }
        }
        return null;
    }

    function findAllUsers() {

        return mockUsers;
    }

    function createUser(user) {
        var newUser = {
            "_id": (new Date).getTime(),
            "firstName": "",
            "lastName": "",
            "username": user.name,
            "password": user.password,
            "roles": [],
            "email": user.email
        };
        mockUsers.push(newUser);

        return newUser;

    }

    function deleteUserById(userId) {

        for (var i = 0; i < mockUsers.length; i++) {
            if (mockUsers[i]._id == userId) {
                mockUsers.splice(i, 1);
                return mockUsers;

            }
        }
        return null;

    }

    function updateUser(userId, user) {

        for (var i = 0; i < mockUsers.length; i++) {
            if (mockUsers[i]._id == userId) {
                mockUsers[i].username = user.username;
                mockUsers[i].password = user.password;
                mockUsers[i].email = user.email;
                mockUsers[i].firstName = user.firstName;
                mockUsers[i].lastName = user.lastName;
                return mockUsers[i];

            }
        }

        return null;
    }


};