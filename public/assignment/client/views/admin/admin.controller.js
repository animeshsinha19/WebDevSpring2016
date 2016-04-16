(function () {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($rootScope, UserService) {
        var vm = this;

        function init() {

            vm.addUser = addUser;
            vm.deleteUser = deleteUser;
            vm.selectUser = selectUser;
            vm.updateUser = updateUser;

            if ($rootScope.newUser) {
                UserService
                    .findAllUsers()
                    .then(function (response) {
                        vm.users = response.data;

                        for (var i = 0; i < vm.users.length; i++) {
                            var user = vm.users[i];
                            var str = '';
                            for (var j = 0; j < user.roles.length; j++) {
                                str += user.roles[j] + " ";
                                if (user.roles.indexOf(user.roles[j]) != user.roles.length - 1) {
                                    str += "| ";
                                }
                            }
                            vm.users[i].parsedRoles = str;
                        }


                    });
            }

        }

        init();

        function updateUser(user) {
            if (user) {

                if (user.roles && user.roles != '') {

                    if (user.roles.indexOf(',') >= 0) {

                        var roles = user.roles.split(',');
                        user.roles = [];
                        console.log(roles);
                        for (var i = 0; i < roles.length; i++) {
                            console.log(roles[i]);
                            if (roles[i].trim() != "") {
                                user.roles.push(roles[i].trim());
                            }

                        }

                    } else {

                        if (Object.prototype.toString.call(user.roles) === '[object Array]') {
                            console.log("array");

                            if (user.roles[0].trim() != '') {
                                user.roles = [user.roles[0].trim()];
                            } else {
                                user.roles = [];
                            }
                        } else {
                            console.log("not array");

                            if (user.roles.trim() != '') {
                                user.roles = [user.roles.trim()];
                            } else {
                                user.roles = [];
                            }
                        }

                    }

                } else {
                    user.roles = [];
                }

                console.log(user);


                var errorFlag = 0;
                if (!user.username) {
                    errorFlag = 1;
                } else if (!user.password) {
                    errorFlag = 1;
                }

                if (errorFlag == 1) {
                    alert("please enter username and password");
                    return;
                }


            } else {
                alert("please enter username and password");
                return;
            }

            var newUser = {
                username: user.username,
                password: user.password
            };
            if (user.roles) {
                newUser.roles = user.roles;
            }

            UserService
                .updateUser(vm.tempUserId, newUser)
                .then(
                    function (response) {
                        UserService
                            .findAllUsers()
                            .then(
                                function (response) {
                                    vm.users = response.data;

                                    for (var i = 0; i < vm.users.length; i++) {
                                        var user = vm.users[i];
                                        var str = '';
                                        for (var j = 0; j < user.roles.length; j++) {
                                            str += user.roles[j] + " ";
                                            if (user.roles.indexOf(user.roles[j]) != user.roles.length - 1) {
                                                str += "| ";
                                            }
                                        }
                                        vm.users[i].parsedRoles = str;
                                    }
                                }
                            );
                    }
                );

            vm.tempUserId = null;

            vm.edituser.username = '';
            vm.edituser.password = '';
            vm.edituser.roles = '';

        }

        function selectUser(index) {
            vm.edituser = {};
            vm.edituser.username = vm.users[index].username;
            vm.edituser.password = vm.users[index].password;
            vm.tempUserId = vm.users[index]._id;

            var user = vm.users[index];
            var str = '';
            for (var j = 0; j < user.roles.length; j++) {
                str += user.roles[j] + " ";
                if (user.roles.indexOf(user.roles[j]) != user.roles.length - 1) {
                    str += ", ";
                }
            }
            vm.edituser.roles = str;

        }


        function deleteUser(index) {
            var userId = vm.users[index]._id;
            UserService
                .deleteUserById(userId)
                .then(
                    function (response) {
                        UserService
                            .findAllUsers()
                            .then(
                                function (response) {
                                    vm.users = response.data;

                                    for (var i = 0; i < vm.users.length; i++) {
                                        var user = vm.users[i];
                                        var str = '';
                                        for (var j = 0; j < user.roles.length; j++) {
                                            str += user.roles[j] + " ";
                                            if (user.roles.indexOf(user.roles[j]) != user.roles.length - 1) {
                                                str += "| ";
                                            }
                                        }
                                        vm.users[i].parsedRoles = str;
                                    }
                                });
                    });
        }

        function addUser(user) {

            if (user) {

                if (user.roles && user.roles != '') {

                    if (user.roles.indexOf(',') >= 0) {

                        var roles = user.roles.split(',');
                        user.roles = [];
                        console.log(roles);
                        for (var i = 0; i < roles.length; i++) {
                            console.log(roles[i]);
                            if (roles[i].trim() != "") {
                                user.roles.push(roles[i].trim());
                            }

                        }

                    } else {

                        if (Object.prototype.toString.call(user.roles) === '[object Array]') {
                            console.log("array");

                            if (user.roles[0].trim() != '') {
                                user.roles = [user.roles[0].trim()];
                            } else {
                                user.roles = [];
                            }
                        } else {
                            console.log("not array");

                            if (user.roles.trim() != '') {
                                user.roles = [user.roles.trim()];
                            } else {
                                user.roles = [];
                            }
                        }

                    }

                } else {
                    user.roles = [];
                }

                console.log(user);


                var errorFlag = 0;
                if (!user.username) {
                    errorFlag = 1;
                } else if (!user.password) {
                    errorFlag = 1;
                }

                if (errorFlag == 1) {
                    alert("please enter username and password");
                    return;
                }


            } else {
                alert("please enter username and password");
                return;
            }

            var newUser = {
                username: user.username,
                password: user.password
            };
            if (user.roles) {
                newUser.roles = user.roles;
            }

            if (vm.tempUserId) {

                UserService
                    .updateUser(vm.tempUserId, newUser)
                    .then(
                        function (response) {
                            UserService
                                .findAllUsers()
                                .then(
                                    function (response) {
                                        vm.users = response.data;

                                        for (var i = 0; i < vm.users.length; i++) {
                                            var user = vm.users[i];
                                            var str = '';
                                            for (var j = 0; j < user.roles.length; j++) {
                                                str += user.roles[j] + " ";
                                                if (user.roles.indexOf(user.roles[j]) != user.roles.length - 1) {
                                                    str += "| ";
                                                }
                                            }
                                            vm.users[i].parsedRoles = str;
                                        }
                                    }
                                );
                        }
                    );
            } else {
                UserService
                    .register(newUser)
                    .then(
                        function (response) {
                            UserService
                                .findAllUsers()
                                .then(
                                    function (response) {
                                        vm.users = response.data;

                                        for (var i = 0; i < vm.users.length; i++) {
                                            var user = vm.users[i];
                                            var str = '';
                                            for (var j = 0; j < user.roles.length; j++) {
                                                str += user.roles[j] + " ";
                                                if (user.roles.indexOf(user.roles[j]) != user.roles.length - 1) {
                                                    str += "| ";
                                                }
                                            }
                                            vm.users[i].parsedRoles = str;
                                        }
                                    }
                                );
                        });

            }

            vm.tempUserId = null;

            vm.edituser.username = '';
            vm.edituser.password = '';
            vm.edituser.roles = '';


        }
    }

})();