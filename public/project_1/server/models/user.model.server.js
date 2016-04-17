var mockUsers = require("./users.mockdata.json");

var q = require('q');

module.exports = function (db, mongoose) {

    var userSchema = require("../schemas/user.schema.server.js")(mongoose);
    var userModel = mongoose.model('prjusers', userSchema);


    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser
    };

    return api;


    function findUserByCredentials(username, password) {

        var deferred = q.defer();


        userModel
            .findOne({
                username: username,
                password: password
            }, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;


    }


    //var flag = false; //,admin = false;
    //for (var i = 0; i < mockUsers.length; i++) {
    //    if (mockUsers[i].username == username && mockUsers[i].password == password) {
    //        //flag = true;
    //        return mockUsers[i];
    //    }
    //}
    //return null;
    //}

    function findAllUsers() {

        var deferred = q.defer();

        userModel.find(function (err, docs) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(docs);
                }
            }
        );
        return deferred.promise;

    }

    function createUser(user) {

        var deferred = q.defer();

        var newUser = {
            "username": user.username,
            "password": user.password,
            "likes": [],
            "comments": []
        };


        if (user.email) {
            newUser.email = user.email;
        } else {
            newUser.email = "";
        }

        if(user.firstName) {
            newUser.firstName = user.firstName;
        } else {
            newUser.firstName = "";
        }

        if(user.lastName) {
            newUser.lastName = user.lastName;
        } else {
            newUser.lastName = "";
        }

        if(user.likes) {
            newUser.likes = user.likes;
        } else {
            newUser.likes = [];
        }

        if(user.comments) {
            newUser.comments = user.comments;
        } else {
            newUser.comments = [];
        }

        if(user.roles){
            newUser.roles = user.roles;
        } else {
            newUser.roles = ['normal'];
        }

        //console.log(user.firstName);

        //console.log(newUser);

        userModel.create(newUser, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

        });
        return deferred.promise;


        //var newUser = {
        //    "_id": (new Date).getTime(),
        //    "firstName": "",
        //    "lastName": "",
        //    "username": user.name,
        //    "password": user.password,
        //    "roles": [],
        //    "email": user.email
        //};
        //mockUsers.push(newUser);
        //
        //return newUser;

    }

    function deleteUserById(userId) {


        var deferred = q.defer();

        userModel.remove({_id: userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;

        //for (var i = 0; i < mockUsers.length; i++) {
        //    if (mockUsers[i]._id == userId) {
        //        mockUsers.splice(i, 1);
        //        return mockUsers;
        //
        //    }
        //}
        //return null;

    }

    function updateUser(userId, user) {

        var deferred = q.defer();

        userModel
            .update({_id: userId}, {$set: user}, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {

                    userModel.findOne({_id: userId}, function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });

                }

            });

        return deferred.promise;

        //for (var i = 0; i < mockUsers.length; i++) {
        //    if (mockUsers[i]._id == userId) {
        //        mockUsers[i].username = user.username;
        //        mockUsers[i].password = user.password;
        //        mockUsers[i].email = user.email;
        //        mockUsers[i].firstName = user.firstName;
        //        mockUsers[i].lastName = user.lastName;
        //        return mockUsers[i];
        //
        //    }
        //}
        //
        //return null;
    }


};