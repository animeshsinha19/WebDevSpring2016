module.exports = function (app, userModel) {

    // POST /api/assignment/user
    app.post("/api/project_1/user", createUser);

    // GET /api/assignment/user
    app.get("/api/project_1/user", getAllUsers);

    // GET /api/assignment/user/:id
    app.get("/api/project_1/user/:id", getUserById);

    // GET /api/assignment/user?username=:username
    app.get("/api/project_1/user?username=:username", getUserByUsername);

    // GET /api/assignment/user?username=:username&password=:password
    app.get("/api/project_1/user?username=:username&password=:password", getUserByCredentials);

    // PUT /api/assignment/user/:id
    app.put("/api/project_1/user/:id", updateUserById);

    // DELETE /api/assignment/user/:id
    app.delete("/api/project_1/user/:id", deleteUserById);


    function createUser(req, res) {
        var user = req.body;

        var newAllUsers = userModel.createUser(user);

        res.json(newAllUsers);

    }

    function getAllUsers(req, res) {
        if (req.query.username && req.query.password) {
            getUserByCredentials(req, res);
        } else if (req.query.username) {
            getUserByUsername(req, res);
        } else {
            res.json(userModel.findAllUsers());
        }

    }

    function getUserById(req, res) {
        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        res.json(user);
    }

    function getUserByUsername(req, res) {
        var username = req.query.username;
        var foundUser = userModel.findUserByUsername(username);
        res.json(foundUser);
    }

    function getUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        var foundUser = userModel.findUserByCredentials(username,password);

        res.json(foundUser);

    }

    function updateUserById(req, res) {
        var userId = req.params.id;
        var user = req.body;

        var updatedUser = userModel.updateUser(userId, user);

        res.json(updatedUser);

    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        var newAllUserAfterDelete = userModel.deleteUserById(userId);
        res.json(newAllUserAfterDelete);
    }
};