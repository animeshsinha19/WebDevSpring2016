module.exports = function (app, userModel) {

    // POST /api/assignment/user
    app.post("/api/assignment/user", createUser);

    // GET /api/assignment/user
    app.get("/api/assignment/user", getAllUsers);

    // GET /api/assignment/user/:id
    app.get("/api/assignment/user/:id", getUserById);

    // GET /api/assignment/user?username=:username
    app.get("/api/assignment/user?username=:username", getUserByUsername);

    // GET /api/assignment/user?username=:username&password=:password
    app.get("/api/assignment/user?username=:username&password=:password", getUserByCredentials);

    // PUT /api/assignment/user/:id
    app.put("/api/assignment/user/:id", updateUserById);

    // DELETE /api/assignment/user/:id
    app.delete("/api/assignment/user/:id", deleteUserById);


    function createUser(req, res) {
        var user = req.body;

        userModel
            .createUser(user)
            .then(function (response) {
                res.json(response);
            });

    }

    function getAllUsers(req, res) {
        if (req.query.username && req.query.password) {
            getUserByCredentials(req, res);
        } else if (req.query.username) {
            getUserByUsername(req, res);
        } else {

            //res.json(userModel.findAllUsers());

            userModel
                .findAllUsers()
                .then(function (response) {
                    res.json(response);
                })
        }

    }

    function getUserById(req, res) {
        var userId = req.params.id;
        userModel
            .findUserById(userId)
            .then(function(response) {
                res.json(response);
            });

    }

    function getUserByUsername(req, res) {
        var username = req.query.username;
        userModel
            .findUserByUsername(username)
            .then(function(response) {
               res.json(response);
            });

    }

    function getUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        userModel
            .findUserByCredentials(username, password)
            .then(function(response) {
                res.json(response);
            });

    }

    function updateUserById(req, res) {
        var userId = req.params.id;
        var user = req.body;

        userModel
            .updateUser(userId, user)
            .then(function (response) {
                res.json(response);
            });


    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        userModel
            .deleteUserById(userId)
            .then(function (response) {
                res.json(response);
            });

    }
};