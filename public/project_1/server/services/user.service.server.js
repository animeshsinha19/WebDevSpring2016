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
        var newUser = req.body;

        if (newUser.roles) {
            if (newUser.roles.indexOf('normal') < 0) {
                newUser.roles.push('normal');
            }

        } else {
            newUser.roles = ['normal'];
        }

        //console.log(newUser);

        userModel
            .createUser(newUser)
            .then(function(response){
                res.json(response);
            });



    }

    function getAllUsers(req, res) {
        if (req.query.username && req.query.password) {
            getUserByCredentials(req, res);
        } else if (req.query.username) {
            getUserByUsername(req, res);
        } else {
            userModel
                .findAllUsers()
                .then(function (response) {
                    res.json(response);
                });
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

        userModel
            .findUserByCredentials(username, password)
            .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.status(400).send();
                }
            );


    }

    function updateUserById(req, res) {
        var userId = req.params.id;
        var user = req.body;

        userModel
            .updateUser(userId, user)
            .then(function (response) {
                res.json(response);
            }, function (err) {
                res.status(400).send();
            });


    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        var newAllUserAfterDelete = userModel.deleteUserById(userId);
        res.json(newAllUserAfterDelete);
    }
};