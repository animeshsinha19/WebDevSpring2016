var mockUsers = require("./user.mock.json");


module.exports = function () {

    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername
    };

    return api;

    function findUserByUsername(username) {
        for(var i=0;i<mockUsers.length;i++) {
            if(mockUsers[i].username == username) {
                return mockUsers[i];
            }
        }
        return null;
    }

    function findUserById(userId) {
        for (var i = 0; i < mockUsers.length; i++) {
            if (mockUsers[i]._id == userId) {
                return mockUsers[i];
            }
        }
        return null;
    }

    function findUserByCredentials(username, password) {

        var flag = false; //,admin = false;
        for (var i = 0; i < mockUsers.length; i++) {
            if (mockUsers[i].username == username && mockUsers[i].password == password) {
                flag = true;
                return mockUsers[i];

            }
        }
        if (!flag) {
            return null;
        }
    }

    function findAllUsers() {

        return mockUsers;
    }

    function createUser(user) {
        var newUser = {
            "_id": (new Date).getTime(),
            "firstName": "",
            "lastName": "",
            "username": user.username,
            "password": user.password,
            "roles": [],
            "email": user.email
        };
        mockUsers.push(newUser);

        return mockUsers;

    }

    function deleteUserById(userId) {

        for (var i = 0; i < mockUsers.length; i++) {
            if (mockUsers[i]._id == userId) {
                mockUsers.splice(i, 1);
                return mockUsers;
            }
        }

    }

    function updateUser(userId, user) {
        //console.log("before:");
        //console.log(users);

        //deleteUserById(userId, function ($response) {
        //    users = $response;
        //
        //});
        //

        //users.push(user);

        //console.log("after:");
        //console.log(users);

        //callback(user);

        for (var i = 0; i < mockUsers.length; i++) {
            if (mockUsers[i]._id == userId) {
                mockUsers[i].username = user.username;
                mockUsers[i].password = user.password;
                mockUsers[i].email = user.email;
                mockUsers[i].firstName = user.firstName;
                mockUsers[i].lastName = user.lastName;
                //console.log("inside update");
                return mockUsers;

            }
        }
    }


    // load user schema
    //var UserSchema = require("./user.schema.server.js")(mongoose);
    //
    //// create user model from schema
    //var UserModel = mongoose.model('User', UserSchema);

    //var api = {
    //    findUserByCredentials: findUserByCredentials,
    //    createUser: createUser,
    //    findUserById: findUserById,
    //    findUsersByIds: findUsersByIds,
    //    userLikesMovie: userLikesMovie
    //};
    //return api;
    //
    //// add movie to user likes
    //function userLikesMovie (userId, movie) {
    //
    //    var deferred = q.defer();
    //
    //    // find the user
    //    UserModel.findById(userId, function (err, doc) {
    //
    //        // reject promise if error
    //        if (err) {
    //            deferred.reject(err);
    //        } else {
    //
    //            // add movie id to user likes
    //            doc.likes.push (movie.imdbID);
    //
    //            // save user
    //            doc.save (function (err, doc) {
    //
    //                if (err) {
    //                    deferred.reject(err);
    //                } else {
    //
    //                    // resolve promise with user
    //                    deferred.resolve (doc);
    //                }
    //            });
    //        }
    //    });
    //
    //    return deferred;
    //}
    //
    //function findUsersByIds (userIds) {
    //    var deferred = q.defer();
    //
    //    // find all users in array of user IDs
    //    UserModel.find({
    //        _id: {$in: userIds}
    //    }, function (err, users) {
    //        if (err) {
    //            deferred.reject(err);
    //        } else {
    //            deferred.resolve(users);
    //        }
    //    });
    //
    //    return deferred.promise;
    //}
    //
    //// use user model find by id
    //function findUserById(userId) {
    //    var deferred = q.defer();
    //    UserModel.findById(userId, function (err, doc) {
    //        if (err) {
    //            deferred.reject(err);
    //        } else {
    //            deferred.resolve(doc);
    //        }
    //    });
    //    return deferred.promise;
    //}
    //
    //function createUser(user) {
    //
    //    // use q to defer the response
    //    var deferred = q.defer();
    //
    //    // insert new user with mongoose user model's create()
    //    UserModel.create(user, function (err, doc) {
    //
    //        if (err) {
    //            // reject promise if error
    //            deferred.reject(err);
    //        } else {
    //            // resolve promise
    //            deferred.resolve(doc);
    //        }
    //
    //    });
    //
    //    // return a promise
    //    return deferred.promise;
    //}
    //
    //function findUserByCredentials(credentials) {
    //
    //    var deferred = q.defer();
    //
    //    // find one retrieves one document
    //    UserModel.findOne(
    //
    //        // first argument is predicate
    //        { username: credentials.username,
    //            password: credentials.password },
    //
    //        // doc is unique instance matches predicate
    //        function(err, doc) {
    //
    //            if (err) {
    //                // reject promise if error
    //                deferred.reject(err);
    //            } else {
    //                // resolve promise
    //                deferred.resolve(doc);
    //            }
    //
    //        });
    //
    //    return deferred.promise;
    //}
};