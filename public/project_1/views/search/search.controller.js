(function () {
    angular
        .module("ProjectApp")
        .controller("searchController", searchController);


    function searchController($scope,$location) {
        $scope.search = search;


        if($scope.place) {

            search($scope.restaurantName);
        }

        function search(place) {
            //$rootScope.restaurantName = restaurant;
            $location.url("/results/"+place);
        }


        //function search_test(restaurant) {
        //    //console.log($scope.restaurantName);
        //    //console.log(RestaurantService.searchByPlace($scope.restaurantName,undefined));
        //    RestaurantService.searchByPlace($scope.restaurantName,function(response) {
        //        console.log(response.businesses);
        //    });
        //}


    }
})();