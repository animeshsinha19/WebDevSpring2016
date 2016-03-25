module.exports = function (app, restaurantModel) {

    // GET /api/project_1/user/:userId/restaurants
    app.get("/api/project_1/user/:userId/restaurants", getLikedRestaurantsForUser);

    // GET /api/project_1/user/restaurants
    app.get("/api/project_1/user/restaurants", getAllLikedRestaurantsForAllUsers);

    // GET /api/project_1/restaurant/:restaurantId/user
    app.get("/api/project_1/restaurant/:restaurantId/user", getAllLikedRestaurants);

    // POST /api/project_1/user/:userId/restaurant/:restaurantId
    app.post("/api/project_1/user/:userId/restaurant/:restaurantId", createLikedRestaurantForUser);

    // DELETE /api/project_1/user/:userId/restaurant/:restaurantId
    app.delete("/api/project_1/user/:userId/restaurant/:restaurantId", deleteLikedRestaurantForUser);


    function getLikedRestaurantsForUser(req, res) {
        var userId = req.params.userId;

        var likedRestaurants = restaurantModel.getLikedRestaurantsForUser(userId);

        res.json(likedRestaurants);
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
        var restaurantId = req.params.restaurantId;

        var restaurants = restaurantModel.setRestaurantAsLikedForUser(userId, restaurantId);

        res.json(restaurants);

    }

    function deleteLikedRestaurantForUser(req,res) {
        var userId = req.params.userId;
        var restaurantId = req.params.restaurantId;
        var restaurants = restaurantModel.deleteLikedRestaurant(userId,restaurantId);
        res.json(restaurants);
    }

};
