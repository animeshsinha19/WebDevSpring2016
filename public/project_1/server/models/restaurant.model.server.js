var likedRestaurants = [];

module.exports = function () {

    var api = {
        getLikedRestaurantsForUser: getLikedRestaurantsForUser,
        setRestaurantAsLikedForUser: setRestaurantAsLikedForUser,
        getAllLikedRestaurants: getAllLikedRestaurants,
        deleteLikedRestaurant: deleteLikedRestaurant,
        getLikedRestaurantsByRestaurantId : getLikedRestaurantsByRestaurantId,
        getLikedRestaurantForUser: getLikedRestaurantForUser

    };

    return api;

    function getLikedRestaurantForUser(userId,restaurantId) {
        for(var i=0;i<likedRestaurants.length;i++) {
            if(likedRestaurants[i].restaurantId == restaurantId && likedRestaurants[i].userId == userId) {
                return likedRestaurants[i];
            }
        }
        return null;

    }

    function getLikedRestaurantsByRestaurantId(restaurantId) {
        var restaurants = [];
        for(var i=0;i<likedRestaurants.length;i++) {
            if(likedRestaurants[i].restaurantId == restaurantId) {
                restaurants.push(likedRestaurants[i]);
            }
        }
        return restaurants;

    }
    function getLikedRestaurantsForUser(userId) {
        var restaurants = [];
        for (var i = 0; i < likedRestaurants.length; i++) {
            if (likedRestaurants[i].userId == userId) {
                restaurants.push(likedRestaurants[i]);
            }
        }
        return restaurants;
    }

    function setRestaurantAsLikedForUser(userId, restaurantId) {
        if (getLikedRestaurantForUser(userId, restaurantId) == null) {
            var newRestaurant = {
                userId: userId,
                restaurantId: restaurantId
            };

            likedRestaurants.push(newRestaurant);
        }

        //console.log(likedRestaurants);

        return getLikedRestaurantsForUser(userId);
    }

    function getAllLikedRestaurants() {
        return likedRestaurants;
    }

    function deleteLikedRestaurant(userId, restaurantId) {
        for (var i = 0; i < likedRestaurants.length; i++) {
            if(likedRestaurants[i].userId == userId && likedRestaurants[i].restaurantId == restaurantId) {
                likedRestaurants.splice(i,1);
            }
        }
        return getLikedRestaurantsForUser(userId);
    }

};