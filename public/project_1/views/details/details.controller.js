(function () {
    angular
        .module("ProjectApp")
        .controller("detailsController", detailsController);

    function detailsController($routeParams, RestaurantService,$scope,$http) {
        var yelpId = $routeParams.id;

        RestaurantService.searchByBusinessId(yelpId,
            function (response) {

                $scope.locationCoords = response.location.coordinate;
                $scope.data = response;
                console.log(response);
            });


    }
})();