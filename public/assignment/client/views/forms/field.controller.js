(function () {
    angular
        .module("FormBuilderApp")
        //.module("FormBuilderApp",["fieldSortable"])
        .controller("FieldController", FieldController);

    function FieldController($routeParams, $rootScope, FieldService) {

        var vm = this;
        vm.formId = $routeParams.formId;

        vm.addField = addField;
        vm.removeField = removeField;

        function init() {

            vm.draggable = {
                axis : 'y'
            };

            if ($rootScope.newUser) {
                FieldService
                    .getFieldsForForm(vm.formId)
                    .then(function (response) {
                        vm.fields = response.data;
                        //console.log(vm.fields);
                    });

            }

        }

        init();


        function removeField(field) {
            var index = vm.fields.indexOf(field);
            var formId, fieldId;

            fieldId = vm.fields[index]._id;
            //console.log(fieldId);
            formId = vm.formId;

            FieldService
                .deleteFieldFromForm(formId, fieldId)
                .then(function (response) {
                    vm.fields = response.data;
                    //console.log(response.data);
                });
        }

        function addField(fieldType) {
            var newField;

            if (fieldType == "singleLine") {
                newField = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};

            } else if (fieldType == "dropdown") {
                newField = {
                    "_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]
                };

            } else if (fieldType == "checkbox") {
                newField = {
                    "_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]
                };

            } else if (fieldType == "radiobtn") {
                newField = {
                    "_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]
                };

            } else if (fieldType == "txtField") {
                newField = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};

            } else if (fieldType == "date") {
                newField = {"_id": null, "label": "New Date Field", "type": "DATE"};
            }

            FieldService
                .createFieldForForm(vm.formId, newField)
                .then(function (response) {
                    vm.fields = response.data;
                    //console.log(response.data);
                });
        }
    }

})();