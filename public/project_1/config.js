(function () {
    angular
        .module("ProjectApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            //.when("/home", {
            //    templateUrl: "home/home.view.html"
            //})
            .when("/search", {
                templateUrl: "search/search.view.html",
                controller: "searchController"
            })
            .when("/maps", {
                templateUrl: "search/maps.view.html",
                controller: "mapsController"
            })
            .when("/results", {
                templateUrl: "results/results.view.html",
                controller: "resultsController"
            })
            .when("/results/:place", {
                templateUrl: "results/results.view.html",
                controller: "resultsController"
            })
            //.when("/search/:title", {
            //    templateUrl: "search/search.view.html",
            //    controller: "searchController"
            //})
            //.when("/detail/:imdbID", {
            //    templateUrl: "search/detail.view.html",
            //    controller: "detailController"
            //})
            .otherwise({
                redirectTo: "/search"
            });
    }
})();