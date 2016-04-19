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
                controller: "searchController",
                controllerAs: "model"
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
                controller: "resultsController",
                controllerAs: "model"
            })
            .when("/details/:id", {
                templateUrl: "views/details/details.view.html",
                controller: "detailsController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "profileController",
                controllerAs: "model"
            })
            .when("/userinfo", {
                templateUrl: "views/users/userinfo.view.html",
                controller: "userInfoController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "registerController",
                controllerAs: "model"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "adminController",
                controllerAs: "model"
            })
            .when("/comments/:id", {
                templateUrl: "views/admin/deletecomment.view.html",
                controller: "commentController",
                controllerAs: "model"
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