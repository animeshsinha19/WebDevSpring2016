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
                templateUrl: "views/search/search.view.html",
                controller: "searchController"
            })
            .when("/maps", {
                templateUrl: "views/search/maps.view.html",
                controller: "mapsController"
            })
            .when("/results", {
                templateUrl: "views/results/results.view.html",
                controller: "resultsController"
            })
            .when("/results/:place", {
                templateUrl: "views/results/results.view.html",
                controller: "resultsController"
            })
            .when("/details/:id", {
                templateUrl: "views/details/details.view.html",
                controller: "detailsController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "loginController"
            })
            .when("/profile", {
                templateUrl: "views/results/profile.view.html",
                controller: "profileController"
            })
            .when("/register", {
                templateUrl: "views/results/register.view.html",
                controller: "registerController"
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