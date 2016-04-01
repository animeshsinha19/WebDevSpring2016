(function () {
    angular
        .module("FormBuilderApp")

        .controller("FieldController", FieldController);

    function FieldController($routeParams, $rootScope, FieldService) {

        var vm = this;
        vm.formId = $routeParams.formId;

        function init() {

            vm.addField = addField;
            vm.removeField = removeField;
            vm.editField = editField;
            vm.updateField = updateField;

            vm.draggable = {
                axis: 'y'
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
                newField = {"label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};

            } else if (fieldType == "password") {

                newField = {"label": "New Password Field", "type": "PASSWORD", "placeholder": "New Password"};

            } else if (fieldType == "email") {

                newField = {"label": "New Email Field", "type": "EMAIL", "placeholder": "New Email"};

            } else if (fieldType == "dropdown") {
                newField = {
                    "label": "New Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]
                };

            } else if (fieldType == "checkbox") {
                newField = {
                    "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]
                };

            } else if (fieldType == "radiobtn") {
                newField = {
                    "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]
                };

            } else if (fieldType == "txtField") {
                newField = {"label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};

            } else if (fieldType == "date") {
                newField = {"label": "New Date Field", "type": "DATE"};
            }

            FieldService
                .createFieldForForm(vm.formId, newField)
                .then(function (response) {
                    vm.fields = response.data;
                    console.log(response.data);
                });
        }

        function editField(field) {
            if (vm.editOptions) {
                delete vm.editOptions;
                //console.log("edit options deleted");
            }
            if (vm.editPlaceholder) {
                delete vm.editPlaceholder;
                //console.log("edit placeholder deleted");
            }

            var fieldToBeEdited = {
                label: field.label,
                type: field.type
            };

            if (field.options.length > 0) {
                fieldToBeEdited.options = field.options;

                var optionString = '\n';

                fieldToBeEdited.options
                    .forEach(function (option) {
                        //console.log(option);
                        optionString += option.label + " : " + option.value + "\n";
                    });
                vm.editOptions = optionString;
                //console.log("edit options set");


            }

            if (field.placeholder) {
                fieldToBeEdited.placeholder = field.placeholder;
                vm.editPlaceholder = fieldToBeEdited.placeholder;
                //console.log("edit placeholder set");
            }

            vm.fieldEdit = fieldToBeEdited;
            vm.editLabel = fieldToBeEdited.label;

        }

        function updateField(newField, newOptions) {
            console.log(newOptions);
            console.log(newField);



        }
    }

})();