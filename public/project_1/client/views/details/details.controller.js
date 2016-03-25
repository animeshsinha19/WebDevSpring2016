(function () {
    angular
        .module("ProjectApp")
        .controller("detailsController", detailsController);

    function detailsController($routeParams, RestaurantService,$scope,$http) {
        var yelpId = $routeParams.id;
        var vm = this;

        RestaurantService
            .searchByBusinessId(yelpId)
            .then( function (response) {

                vm.locationCoords = response.data.location.coordinate;
                vm.data = response.data;
                vm.address = response.data.location.display_address;

            });


    }
})();