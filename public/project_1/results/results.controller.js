(function () {

    angular
        .module("ProjectApp")
        .controller("resultsController", resultsController);

    function resultsController($scope, $routeParams,RestaurantService) {
        var place = $routeParams.place;


        RestaurantService.searchByPlace(
            place,
            function (response) {
                $scope.restaurants = response.businesses;
                console.log(response.businesses);
            });





    }
})();