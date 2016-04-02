(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http) {

        var api = {

            updateField: updateField,
            duplicateFieldForm: duplicateFieldForm,
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm
        };
        return api;

        function duplicateFieldForm(formId, index, field) {
            //console.log("inside service");
            return $http.post("/api/assignment/form/" + formId + "/field/" + index, field);
        }

        function updateField(formId, fieldId, field) {
            return $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field);
        }

        function createFieldForForm(formId, field) {
            return $http.post("/api/assignment/form/" + formId + "/field", field);
        }

        function getFieldsForForm(formId) {
            return $http.get("/api/assignment/form/" + formId + "/field");
        }

        function getFieldForForm(formId, fieldId) {
            return $http.get("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function deleteFieldFromForm(formId, fieldId) {
            return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId);
        }


    }

})();

