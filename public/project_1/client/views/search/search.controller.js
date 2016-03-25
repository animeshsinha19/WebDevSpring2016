(function () {
    angular
        .module("ProjectApp")
        .controller("searchController", searchController);


    function searchController($scope, $location) {

        var vm = this;

        function init() {
            vm.search = search;

            if (vm.location) {
                search(vm.location.place);
            }

        }
        init();


        function search(location) {
            //$rootScope.restaurantName = restaurant;
            //console.log(location.place);
            $location.url("/results/" + location.place);
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