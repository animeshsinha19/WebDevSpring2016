(function () {
    angular
        .module("ProjectApp")
        .controller("detailsController", detailsController);

    function detailsController($routeParams, RestaurantService, $rootScope) {
        var yelpId = $routeParams.id;
        var vm = this;


        vm.likebtn = likebtn;

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

        RestaurantService
            .searchByBusinessId(yelpId)
            .then(function (response) {

                vm.locationCoords = response.data.location.coordinate;
                vm.data = response.data;
                vm.address = response.data.location.display_address;

            });


    }
})();