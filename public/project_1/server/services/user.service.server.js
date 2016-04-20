module.exports = function (app, userModel) {

    // POST /api/project_1/user
    app.post("/api/project_1/user", createUser);

    // GET /api/project_1/user
    app.get("/api/project_1/user", getAllUsers);

    // GET /api/project_1/user/:id
    app.get("/api/project_1/user/:id", getUserById);

    // GET /api/project_1/user?username=:username
    app.get("/api/project_1/user?username=:username", getUserByUsername);

    // GET /api/project_1/user?username=:username&password=:password
    app.get("/api/project_1/user?username=:username&password=:password", getUserByCredentials);

    // POST /api/project_1/user/:id
    app.post("/api/project_1/user/:id", updateUserById);

    // DELETE /api/project_1/user/:id
    app.delete("/api/project_1/user/:id", deleteUserById);

    // GET /api/project_1/user/userloggedIn/:loggedInUser/followId/:followId
    app.get("/api/project_1/user/userloggedInId/:loggedInUserId/followId/:followId", followUser);

    // DELETE /api/project_1/user/userloggedIn/:loggedInUser/followId/:followId
    app.delete("/api/project_1/user/userloggedInId/:loggedInUserId/followId/:followId", unFollowUser);


    // DELETE /api/project_1/restaurant/:restaurantName/user/:userId/comment/:comment
    app.delete("/api/project_1/restaurant/:restaurantName/user/:userId/comment/:comment", deleteUserComment);

    // GET /api/project_1/restaurant/comments
    app.get("/api/project_1/restaurant/comments", getUserComments);

    // POST /api/project_1/restaurant/comment
    app.post("/api/project_1/restaurant/comment", createCommentForUser);

    // GET /api/project_1/user/:userId/restaurants
    app.get("/api/project_1/user/:userId/restaurants", getLikedRestaurantsForUser);

    // GET /api/project_1/user/restaurants
    app.get("/api/project_1/user/restaurants", getAllLikedRestaurantsForAllUsers);

    // GET /api/project_1/restaurant/:restaurantId/user
    app.get("/api/project_1/restaurant/:restaurantId/user", getAllUsersByRestaurantId);

    // GET /api/project_1/user/:userId/restaurant/:restaurantId
    app.get("/api/project_1/user/:userId/restaurant/:restaurantId", getLikedRestaurantForUser);

    // POST /api/project_1/user/:userId/restaurant/:restaurantId
    app.post("/api/project_1/user/:userId/restaurant", createLikedRestaurantForUser);

    // DELETE /api/project_1/user/:userId/restaurant/:restaurantId
    app.delete("/api/project_1/user/:userId/restaurant/:restaurantId", deleteLikedRestaurantForUser);


    function followUser(req, res) {
        var loggedInUserId = req.params.loggedInUserId;
        var followId = req.params.followId;

        userModel
            .followAnotherUser(loggedInUserId, followId)
            .then(function (response) {
                res.json(response);
            });

    }

    function unFollowUser(req, res) {
        var loggedInUserId = req.params.loggedInUserId;
        var followId = req.params.followId;

        userModel
            .unFollowAnotherUser(loggedInUserId, followId)
            .then(function (response) {
                res.json(response);
            });

    }


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
            userModel
                .findAllUsers()
                .then(function (response) {
                    res.json(response);
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
                res.status(200).send(err);
            });


    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        var newAllUserAfterDelete = userModel.deleteUserById(userId);
        res.json(newAllUserAfterDelete);
    }


    function getAllUsersByRestaurantId(req, res) {
        var restaurantId = req.params.restaurantId;
        userModel
            .getAllUsersByRestaurantId(restaurantId)
            .then(function (response) {
                res.json(response);
            });


    }

    function getLikedRestaurantForUser(req, res) {
        var userId = req.params.userId;
        var restaurantId = req.params.restaurantId;


        userModel
            .getLikedRestaurantForUser(userId, restaurantId)
            .then(function (response) {
                res.json(response);
            }, function (error) {
                //console.log("here");
                res.json(null);
            });

        //console.log(restaurant);

        //res.json(restaurant);
    }

    function getLikedRestaurantsForUser(req, res) {
        var userId = req.params.userId;

        userModel
            .getLikedRestaurantsForUser(userId)
            .then(function (response) {
                res.json(response);
            });

        //res.json(likedRestaurants);
    }

    function getAllLikedRestaurantsForAllUsers(req, res) {
        res.json(restaurantModel.getAllLikedRestaurants());
    }

    function getAllLikedRestaurants(req, res) {
        var restaurantId = req.params.restaurantId;

        var restaurants = restaurantModel.getLikedRestaurantsByRestaurantId(restaurantId);

        res.json(restaurants);

    }

    function createLikedRestaurantForUser(req, res) {
        var userId = req.params.userId;
        var newRestaurant = req.body;

        userModel
            .setRestaurantAsLikedForUser(userId, newRestaurant)
            .then(function (response) {
                res.json(response);
            });


        //console.log(restaurants);

        //res.json(restaurants);

    }

    function deleteLikedRestaurantForUser(req, res) {
        var userId = req.params.userId;
        var restaurantId = req.params.restaurantId;
        userModel
            .deleteLikedRestaurantForUser(userId, restaurantId)
            .then(function (response) {
                res.json(response);
            });


        //console.log(restaurants);


    }

    function createCommentForUser(req, res) {
        var commentObj = req.body;


        var userId = commentObj.userId;
        var yelpId = commentObj.yelpId;
        var comments = commentObj.comments;
        var restaurantName = commentObj.restaurantName;
        var address = commentObj.address;

        userModel
            .createCommentForUser(userId, yelpId, comments, restaurantName, address)
            .then(function (response) {
                res.json(response);
            });


    }

    function getUserComments(req, res) {
        userModel
            .getUserComments()
            .then(function (response) {
                res.json(response);
            });
    }

    function deleteUserComment(req, res) {
        var restaurantName = req.params.restaurantName;
        var userId = req.params.userId;
        var comment = req.params.comment;

        userModel
            .deleteUserComment(restaurantName, userId, comment)
            .then(function (response) {
                //console.log("here");
                res.json(response);
            });
    }

};