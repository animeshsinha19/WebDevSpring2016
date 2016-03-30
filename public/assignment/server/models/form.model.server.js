var mockForms = require("./form.mock.json");

module.exports = function (db,mongoose) {

    var api = {
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        getFormByFormId: getFormByFormId,

        getFieldByFormId: getFieldByFormId,
        createFieldByFormId: createFieldByFormId,
        deleteFieldByFieldIdAndFormId: deleteFieldByFieldIdAndFormId,
        getFieldByFieldIdAndFormId: getFieldByFieldIdAndFormId
    };

    return api;

    // Field related API
    // *****************************************************************************

    function getFieldByFieldIdAndFormId(formId, fieldId) {
        for (var i = 0; i < mockForms.length; i++) {
            if (mockForms[i]._id == formId) {
                var fields = mockForms[i].fields;
                for (var j = 0; j < fields.length; j++) {

                    if (fields[j]._id == fieldId) {
                        return mockForms[i].fields[j];

                    }
                }
            }
        }

        return null;

    }


    function getFieldByFormId(formId) {
        for (var i = 0; i < mockForms.length; i++) {
            if (mockForms[i]._id == formId) {
                return mockForms[i].fields;
            }
        }
        return null;

    }

    function createFieldByFormId(formId, field) {
        for (var i = 0; i < mockForms.length; i++) {
            if (mockForms[i]._id == formId) {
                field._id = (new Date).getTime().toString();

                mockForms[i].fields.push(field);

                return mockForms[i].fields;
            }
        }
        return null;
    }

    function deleteFieldByFieldIdAndFormId(formId, fieldId) {
        for (var i = 0; i < mockForms.length; i++) {
            if (mockForms[i]._id == formId) {
                var fields = mockForms[i].fields;
                for (var j = 0; j < fields.length; j++) {

                    if (fields[j]._id == fieldId) {
                        fields.splice(j, 1);
                        mockForms[i].fields = fields;
                        return mockForms[i].fields;

                    }
                }
            }
        }

        return null;
    }

    // Form related API
    // *****************************************************************************

    function getFormByFormId(formId) {
        for (var i = 0; i < mockForms.length; i++) {
            if (mockForms[i]._id == formId) {
                return mockForms[i];
            }
        }
        return null;
    }

    function createFormForUser(userId, form) {
        var newForm = {
            "_id": (new Date).getTime().toString(),
            "title": form.title,
            "userId": userId,
            "fields": []
        };
        mockForms.push(newForm);
        return findAllFormsForUser(userId);

    }

    function findAllFormsForUser(userId) {

        var userForms = [];
        for (var i = 0; i < mockForms.length; i++) {
            if (mockForms[i].userId == userId) {
                var formDetails = {
                    "_id": mockForms[i]._id,
                    "title": mockForms[i].title,
                    "userId": userId,
                    "fields": mockForms[i].fields
                };
                userForms.push(formDetails);
            }
        }
        return userForms;

    }

    function deleteFormById(formId) {

        var mainindex, userid;

        for (var i = 0; i < mockForms.length; i++) {
            if (mockForms[i]._id == formId) {
                mainindex = i;
                userid = mockForms[i].userId;
                break;
            }
        }

        mockForms.splice(mainindex, 1);

        var newForms = findAllFormsForUser(userid);
        return newForms;

    }

    function updateFormById(formId, newForm) {

        for (var i = 0; i < mockForms.length; i++) {
            if (mockForms[i]._id == formId) {
                mockForms[i].title = newForm.title;
                return findAllFormsForUser(mockForms[i].userId);

            }
        }
        return null;


    }

};
