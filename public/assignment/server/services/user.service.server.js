module.exports = function (app, userModel) {
    app.post("/api/assignment/user", createUser);

    app.get("/api/assignment/user", getAllUsers);

    app.get("/api/assignment/user/:id", getUserById);

    app.get("/api/assignment/user?username=username", getUserByUsername);

    app.get("/api/assignment/user?username=alice&password=wonderland", getUserByCredentials);

    app.put("/api/assignment/user/:id", updateUserById);

    app.delete("/api/assignment/user/:id", deleteUserById);

    function createUser(req, res) {
        var user = req.body;

        newAllUsers = userModel.createUser(user);

        res.json(newAllUsers);

    }

    function getAllUsers() {

    }

    function getUserById() {

    }

    function getUserByUsername() {

    }

    function getUserByCredentials() {

    }

    function updateUserById() {

    }

    function deleteUserById() {

    }
};