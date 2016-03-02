(function () {
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "home.view.test.html"
            })
            .when("/register", {
                templateUrl: "register.view.test.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "login.view.test.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "profile.view.test.html",
                controller: "ProfileController"
            })
            .when("/admin", {
                templateUrl: "admin.view.test.html",
                controller: "searchController"
            })
            .when("/forms", {
                templateUrl: "forms.view.test.html",
                controller: "FormController"
            })
            .when("/search/:title", {
                templateUrl: "search/search.view.html",
                controller: "searchController"
            })
            .when("/detail/:imdbID", {
                templateUrl: "search/detail.view.html",
                controller: "detailController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();