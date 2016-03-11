(function () {
    angular
        .module("ProjectApp")
        .controller("searchController", searchController);


    function searchController($scope,RestaurantService) {
        $scope.search = search;

        function search(restaurant) {
            //console.log($scope.restaurantName);
            //console.log(RestaurantService.searchByPlace($scope.restaurantName,undefined));
            RestaurantService.searchByPlace($scope.restaurantName,function(response) {
                console.log(response.businesses);
            });
        }


    }
})();