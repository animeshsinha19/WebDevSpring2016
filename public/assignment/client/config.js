(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"

            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                resolve: {
                    loggedin: checkAdmin
                }

            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller: "FormController",
                controllerAs: "model"
            })
            .when("/form/:formId/fields", {
                templateUrl: "views/forms/fields.view.html",
                controller: "FieldController",
                controllerAs: "model"

            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    var checkAdmin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin')
            .success(
                function (user) {
                    $rootScope.errorMessage = null;
                    // User is Authenticated

                    if (user !== '0' && user[0].roles.indexOf('admin') != -1) {
                        $rootScope.currentUser = user;
                        deferred.resolve();
                    }
                    else {
                        $rootScope.errorMessage = 'You need to log in.';
                        deferred.reject();
                        $location.url('/login');
                    }
                });

        return deferred.promise;
    };


    var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin')
            .success(
                function (user) {
                    $rootScope.errorMessage = null;
                    // User is Authenticated
                    if (user !== '0') {
                        $rootScope.currentUser = user;
                        deferred.resolve();
                    }
                    // User is Not Authenticated
                    else {
                        $rootScope.errorMessage = 'You need to log in.';
                        deferred.reject();
                        $location.url('/login');
                    }
                });

        return deferred.promise;
    };

    var checkCurrentUser = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin')
            .success(
                function (user) {
                    $rootScope.errorMessage = null;
                    // User is Authenticated
                    if (user !== '0') {
                        $rootScope.currentUser = user;
                    }
                    deferred.resolve();
                });

        return deferred.promise;
    };

})();