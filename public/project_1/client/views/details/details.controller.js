(function () {
    angular
        .module("ProjectApp")
        .controller("detailsController", detailsController);

    function detailsController($routeParams, RestaurantService, UserService, $rootScope) {
        var yelpId = $routeParams.id;
        var vm = this;


        vm.likebtn = likebtn;

        getLikes();

        function likebtn() {
            if (vm.liked == "yes") {
                vm.liked = "no";
                RestaurantService
                    .deleteLikedRestaurantForUser($rootScope.newUser._id, yelpId);


            } else {
                vm.liked = "yes";
                RestaurantService
                    .createLikedRestaurantForUser($rootScope.newUser._id, yelpId);
            }

            getLikes();
        }

        if ($rootScope.newUser) {
            RestaurantService
                .getLikedRestaurantForUser($rootScope.newUser._id, yelpId)
                .then(function (response) {
                    if (response.data) {
                        vm.liked = "yes";
                    } else {
                        vm.liked = "no";
                    }
                });

        }



        function getLikes() {
            RestaurantService
                .getLikedRestaurantsByRestaurantId(yelpId)
                .then(function (response) {
                    var userIds = [];
                    var restaurants = response.data;
                    for (var i = 0; i < restaurants.length; i++) {
                        userIds.push(restaurants[i].userId);
                    }
                    UserService
                        .findAllUsers()
                        .then(function (response) {
                            var userNames = [];
                            var allUsers = response.data;
                            for (var i = 0; i < userIds.length; i++) {
                                for (var j = 0; j < allUsers.length; j++) {
                                    if(userIds[i] == allUsers[j]._id) {
                                        userNames.push(allUsers[j].firstName);
                                    }
                                }
                            }

                            vm.firstNames = userNames;

                        });
                });
        }


        RestaurantService
            .searchByBusinessId(yelpId)
            .then(function (response) {

                vm.locationCoords = response.data.location.coordinate;
                vm.data = response.data;
                vm.address = response.data.location.display_address;

            });


    }
})();