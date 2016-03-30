var mockUsers = require("./user.mock.json");

var q = require('q');

module.exports = function (db, mongoose) {

    var UserSchema = require('./user.schema.server.js')(mongoose);

    var UserModel = mongoose.model('User', UserSchema);


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
        var deferred = q.defer();

        UserModel.find({username: username}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;


    }

    function findUserById(userId) {
        var deferred = q.defer();

        UserModel.find({_id: userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;

    }

    function findUserByCredentials(username, password) {

        var deferred = q.defer();

        UserModel.find({
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

    function findAllUsers() {
        var deferred = q.defer();

        UserModel.find(function (err, docs) {
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
            "firstName": "",
            "lastName": "",
            "username": user.username,
            "password": user.password,
            "roles": [],
            "emails": [user.email]
        };

        UserModel.create(newUser, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

        });
        return deferred.promise;


    }

    function deleteUserById(userId) {

        var deferred = q.defer();

        UserModel.remove({_id: userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;

    }

    function updateUser(userId, user) {
        var deferred = q.defer();

        UserModel
            .update({_id: userId}, {$set: user}, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {

                    UserModel.find({_id: userId}, function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });

                }

            });

        return deferred.promise;


    }

};