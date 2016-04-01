var mockForms = require("./form.mock.json");

var q = require('q');

module.exports = function (db, mongoose) {

    var FormSchema = require('./form.schema.server.js')(mongoose);
    var FormModel = mongoose.model('Form', FormSchema);

    var api = {
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        getFormByFormId: getFormByFormId,

        getFieldsByFormId: getFieldsByFormId,
        createFieldByFormId: createFieldByFormId,
        deleteFieldByFieldIdAndFormId: deleteFieldByFieldIdAndFormId,
        getFieldByFieldIdAndFormId: getFieldByFieldIdAndFormId
    };

    return api;

    // Field related API
    // *****************************************************************************

    function getFieldByFieldIdAndFormId(formId, fieldId) {

        var deferred = q.defer();

        FormModel
            .findById(formId, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    var allFields = doc.fields;
                    for (var field in allFields) {
                        if (field._id == fieldId) {
                            deferred.resolve(field);
                        }
                    }

                }
            });

        return deferred.promise;


        //for (var i = 0; i < mockForms.length; i++) {
        //    if (mockForms[i]._id == formId) {
        //        var fields = mockForms[i].fields;
        //        for (var j = 0; j < fields.length; j++) {
        //
        //            if (fields[j]._id == fieldId) {
        //                return mockForms[i].fields[j];
        //
        //            }
        //        }
        //    }
        //}
        //
        //return null;

    }


    function getFieldsByFormId(formId) {
        var deferred = q.defer();

        FormModel
            .findById(formId, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc.fields);
                }
            });

        return deferred.promise;

        //for (var i = 0; i < mockForms.length; i++) {
        //    if (mockForms[i]._id == formId) {
        //        return mockForms[i].fields;
        //    }
        //}
        //return null;

    }

    function createFieldByFormId(formId, field) {
        var deferred = q.defer();

        FormModel.update({_id: formId},
            {$push: {fields: field}},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    FormModel
                        .findById(formId, function (err, doc) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                //console.log(doc);
                                deferred.resolve(doc.fields);
                            }
                        });
                }
            });
        return deferred.promise;


        //for (var i = 0; i < mockForms.length; i++) {
        //    if (mockForms[i]._id == formId) {
        //        field._id = (new Date).getTime().toString();
        //
        //        mockForms[i].fields.push(field);
        //
        //        return mockForms[i].fields;
        //    }
        //}
        //return null;
    }

    function deleteFieldByFieldIdAndFormId(formId, fieldId) {

        var deferred = q.defer();

        FormModel.update({_id: formId},
            {$pull: {fields: {_id: fieldId}}},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    FormModel
                        .findById(formId, function (err, doc) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                //console.log(doc);
                                deferred.resolve(doc.fields);
                            }
                        });
                }
            });
        return deferred.promise;


        //for (var i = 0; i < mockForms.length; i++) {
        //    if (mockForms[i]._id == formId) {
        //        var fields = mockForms[i].fields;
        //        for (var j = 0; j < fields.length; j++) {
        //
        //            if (fields[j]._id == fieldId) {
        //                fields.splice(j, 1);
        //                mockForms[i].fields = fields;
        //                return mockForms[i].fields;
        //
        //            }
        //        }
        //    }
        //}
        //
        //return null;
    }

    // Form related API
    // *****************************************************************************

    function getFormByFormId(formId) {
        var deferred = q.defer();

        FormModel.find({_id: formId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;

        //for (var i = 0; i < mockForms.length; i++) {
        //    if (mockForms[i]._id == formId) {
        //        return mockForms[i];
        //    }
        //}
        //return null;
    }

    function createFormForUser(userId, form) {
        var deferred = q.defer();

        var newForm = {
            //"_id": (new Date).getTime().toString(),
            "title": form.title,
            "userId": userId

        };

        FormModel.create(newForm, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;

        //mockForms.push(newForm);
        //return findAllFormsForUser(userId);

    }

    function findAllFormsForUser(userId) {

        var deferred = q.defer();

        FormModel.find({userId: userId}, function (err, docs) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(docs);
            }
        });
        return deferred.promise;

        //var userForms = [];
        //for (var i = 0; i < mockForms.length; i++) {
        //    if (mockForms[i].userId == userId) {
        //        var formDetails = {
        //            "_id": mockForms[i]._id,
        //            "title": mockForms[i].title,
        //            "userId": userId,
        //            "fields": mockForms[i].fields
        //        };
        //        userForms.push(formDetails);
        //    }
        //}
        //return userForms;

    }

    function deleteFormById(formId) {

        var deferred = q.defer();

        FormModel.findOneAndRemove({_id: formId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;


        //var mainindex, userid;
        //
        //for (var i = 0; i < mockForms.length; i++) {
        //    if (mockForms[i]._id == formId) {
        //        mainindex = i;
        //        userid = mockForms[i].userId;
        //        break;
        //    }
        //}
        //
        //mockForms.splice(mainindex, 1);
        //
        //var newForms = findAllFormsForUser(userid);
        //return newForms;

    }

    function updateFormById(formId, newForm) {

        var deferred = q.defer();

        FormModel
            .update({_id: formId}, {$set: newForm}, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {

                    deferred.resolve(doc);

                }

            });

        return deferred.promise;

        //for (var i = 0; i < mockForms.length; i++) {
        //    if (mockForms[i]._id == formId) {
        //        mockForms[i].title = newForm.title;
        //        return findAllFormsForUser(mockForms[i].userId);
        //
        //    }
        //}
        //return null;


    }

};
