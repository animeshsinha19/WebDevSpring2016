(function () {
    'use strict';
    angular
        .module("ProjectApp")
        .controller("userInfoController", userInfoController);

    function userInfoController(RestaurantService, $rootScope) {

        var vm = this;
        vm.restaurants = [];

        var newUser = $rootScope.newUser;
        //console.log(newUser);

        vm.username = newUser.username;
        vm.password = newUser.password;
        vm.email = newUser.email;
        vm.firstname = newUser.firstName;
        vm.lastname = newUser.lastName;

        RestaurantService
            .getLikedRestaurantsForUser($rootScope.newUser._id)
            .then(function (response) {
                getRestaurantDetails(response.data);
            });

        function getRestaurantDetails(restaurants) {
            // just get the restaurant IDs for now

            //vm.restaurants

            if (restaurants) {
                for (var i = 0; i < restaurants.length; i++) {
                    vm.restaurants.push(restaurants[i].yelpID);

                }
            }

        }


    }
})();