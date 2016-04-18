(function () {
    angular
        .module("ProjectApp")
        .controller("detailsController", detailsController);

    function detailsController($routeParams, RestaurantService, UserService, $rootScope) {
        var yelpId = $routeParams.id;
        var vm = this;

        function init() {
            vm.likebtn = likebtn;
            getLikes();
            getLikedGlyph();
            getRestaurantData();
        }

        init();

        function getRestaurantData() {
            RestaurantService
                .searchByBusinessId(yelpId)
                .then(function (response) {

                    vm.locationCoords = response.data.location.coordinate;
                    vm.data = response.data;
                    vm.restaurantName = vm.data.name;
                    vm.address = response.data.location.display_address;

                });
        }

        function getLikedGlyph() {
            if ($rootScope.newUser) {
                RestaurantService
                    .getLikedRestaurantForUser($rootScope.newUser._id, yelpId)
                    .then(function (response) {
                        //console.log(response.data);

                        if (response.data) {
                            vm.liked = "yes";
                        } else {
                            vm.liked = "no";
                        }
                    });

            }
        }


        function likebtn() {
            var newRestaurant = {
                yelpID: yelpId,
                name: vm.restaurantName,
                address: vm.address
            };

            //console.log(newRestaurant);

            if (vm.liked == "yes") {
                vm.liked = "no";
                RestaurantService
                    .deleteLikedRestaurantForUser($rootScope.newUser._id, yelpId);


            } else {
                vm.liked = "yes";
                RestaurantService
                    .createLikedRestaurantForUser($rootScope.newUser._id, newRestaurant);
            }

            getLikes();
        }


        function getLikes() {
            RestaurantService
                .getAllUsersByRestaurantId(yelpId)
                .then(function (response) {

                    var users = response.data;

                    var firstnames = [];
                    for (var i = 0; i < users.length; i++) {
                        firstnames.push(users[i].firstName);
                    }
                    vm.firstNames = firstnames;

                    //console.log(firstnames);
                    console.log(response.data);
                    //var userIds = getUserIds(response.data);
                    //
                    //getUserNamesFromIds(userIds);
                });
        }

        //function getUserNamesFromIds(userIds) {
        //    UserService
        //        .findAllUsers()
        //        .then(function (response) {
        //            vm.firstNames = getUserNames(response.data, userIds);
        //            //console.log(vm.firstNames);
        //        });
        //}
        //
        //function getUserIds(users) {
        //    var userIds = [];
        //
        //    for (var i = 0; i < users.length; i++) {
        //        userIds.push(users[i]._id);
        //    }
        //
        //    return userIds;
        //}
        //
        //function getUserNames(allUsers, userIds) {
        //    var userNames = [];
        //
        //    for (var i = 0; i < userIds.length; i++) {
        //        for (var j = 0; j < allUsers.length; j++) {
        //
        //            if (userIds[i] == allUsers[j]._id) {
        //
        //                //console.log("here");
        //
        //                userNames.push(allUsers[j].firstName);
        //            }
        //        }
        //    }
        //    //console.log(userNames);
        //
        //    return userNames;
        //}


    }
})();