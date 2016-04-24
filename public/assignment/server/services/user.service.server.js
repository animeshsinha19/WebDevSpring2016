var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");


module.exports = function (app, userModel) {

    var auth = authenticated;
    var adminAuth = isAdmin;
    var loginUser;


    // ADMIN APIs

    // POST /api/assignment/admin/user
    app.post("/api/assignment/admin/user", adminAuth, adminCreateUser);

    // GET /api/assignment/admin/user
    app.get("/api/assignment/admin/user", adminAuth, adminGetAllUsers);

    // GET /api/assignment/admin/user/:userId
    app.get("/api/assignment/admin/user/:userId", adminAuth, adminGetUserById);

    // DELETE /api/assignment/admin/user/:userId
    app.delete("/api/assignment/admin/user/:userId", adminAuth, adminDeleteUserById);

    // PUT /api/assignment/admin/user/:userId
    app.put("/api/assignment/admin/user/:userId", adminAuth, adminUpdateUserById);


    //USER APIs

    // POST /api/assignment/user
    app.post("/api/assignment/user", createUser);

    // GET /api/assignment/user
    app.get("/api/assignment/user", adminAuth, getAllUsers);

    // GET /api/assignment/user/:id
    app.get("/api/assignment/user/:id", adminAuth, getUserById);

    // GET /api/assignment/user?username=:username
    app.get("/api/assignment/user?username=:username", getUserByUsername);

    // GET /api/assignment/user?username=:username&password=:password
    app.get("/api/assignment/user?username=:username&password=:password", getUserByCredentials);

    // PUT /api/assignment/user/:id
    app.put("/api/assignment/user/:id", auth, updateUserById);

    // DELETE /api/assignment/user/:id
    app.delete("/api/assignment/user/:id", adminAuth, deleteUserById);

    // POST /api/assignment/login
    app.post("/api/assignment/login", passport.authenticate('local'), login);

    // POST /api/assignment/logout
    app.post("/api/assignment/logout", logout);

    // POST /api/assignment/register
    app.post("/api/assignment/register", register);

    //GET /api/assignment/loggedin
    app.get("/api/assignment/loggedin", loggedin);


    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {

                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, user);
                    }


                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function authenticated(req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.send(401);
        }
    }

    function isAdmin(req, res, next) {

        if (req.isAuthenticated()) {
            if (loginUser.roles.indexOf('admin') > -1) {
                next();
            }
        } else {
            res.send(403);
        }


    }

    function register(req, res) {
        var newUser = req.body;
        if (newUser.roles) {
            if (newUser.roles.indexOf('student') < 0) {
                newUser.roles.push('student');
            }

        } else {
            newUser.roles = ['student'];
        }


        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user) {
                        //console.log(user);
                        res.json(null);
                    } else {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createUser(newUser)
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        req.login(
                            user,
                            function (err) {
                                if (err) {
                                    res.status(400).send(err);
                                } else {
                                    res.json(user);
                                }
                            });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function login(req, res) {
        loginUser = req.user;
        res.json(req.user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

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
                .then(
                    function (response) {
                        res.json(response);
                    },
                    function (err) {
                        res.status(400).send(err);
                    });
        }

    }

    function getUserById(req, res) {
        var userId = req.params.id;
        userModel
            .findUserById(userId)
            .then(function (response) {
                res.json(response);
            });

    }

    function getUserByUsername(req, res) {
        var username = req.query.username;
        userModel
            .findUserByUsername(username)
            .then(function (response) {
                res.json(response);
            });

    }

    function getUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        userModel
            .findUserByCredentials(username, password)
            .then(function (response) {
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
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        userModel
            .deleteUserById(userId)
            .then(
                function (response) {
                    res.json(response);
                });

    }

    function adminCreateUser(req, res) {
        var user = req.body;

        userModel
            .createUser(user)
            .then(function (response) {
                res.json(response);
            });
    }

    function adminGetAllUsers(req, res) {
        userModel
            .findAllUsers()
            .then(
                function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function adminGetUserById(req, res) {
        var userId = req.params.id;
        userModel
            .findUserById(userId)
            .then(function (response) {
                res.json(response);
            });
    }

    function adminDeleteUserById(req, res) {
        var userId = req.params.id;
        userModel
            .deleteUserById(userId)
            .then(
                function (response) {
                    res.json(response);
                });
    }

    function adminUpdateUserById(req, res) {
        var userId = req.params.id;
        var user = req.body;

        userModel
            .updateUser(userId, user)
            .then(function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }
};
