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

        function executeAddField(newField) {
            FieldService
                .createFieldForForm(vm.formId, newField)
                .then(function (response) {
                    vm.fields = response.data;
                    //console.log(response.data);
                });
        }
        function addField(fieldType) {
            var newField;

            if(vm.notSelMenu) {
                delete vm.notSelMenu;
                console.log("inside not sel menu");
            }

            if (fieldType == "singleLine") {
                newField = {"label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                executeAddField(newField);

            } else if (fieldType == "password") {

                newField = {"label": "New Password Field", "type": "PASSWORD", "placeholder": "New Password"};
                executeAddField(newField);

            } else if (fieldType == "email") {

                newField = {"label": "New Email Field", "type": "EMAIL", "placeholder": "New Email"};
                executeAddField(newField);

            } else if (fieldType == "dropdown") {
                newField = {
                    "label": "New Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]
                };
                executeAddField(newField);

            } else if (fieldType == "checkbox") {
                newField = {
                    "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]
                };
                executeAddField(newField);

            } else if (fieldType == "radiobtn") {
                newField = {
                    "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]
                };
                executeAddField(newField);

            } else if (fieldType == "txtField") {
                newField = {"label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
                executeAddField(newField);

            } else if (fieldType == "date") {
                newField = {"label": "New Date Field", "type": "DATE"};
                executeAddField(newField);
            } else {
                vm.notSelMenu = "Please select an option";
                console.log("inside not sel menu");
            }


        }

        function editField(field) {

            if (vm.showEditOptions) {
                delete vm.showEditOptions;
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
                vm.showEditOptions = optionString;
                //console.log("edit options set");


            }

            if (field.placeholder) {
                fieldToBeEdited.placeholder = field.placeholder;
                vm.editPlaceholder = fieldToBeEdited.placeholder;
                //console.log("edit placeholder set");
            }

            vm.fieldEdit = fieldToBeEdited;
            vm.fieldId = field._id;

            vm.editLabel = fieldToBeEdited.label;

        }

        function updateField(newField, newOptions) {

            if (newOptions) {
                var updatedOptions = [];

                //console.log(newOptions);
                newOptions = newOptions.trim();
                var lines = newOptions.split("\n");
                for (var i = 0; i < lines.length; i++) {
                    var tempVal = lines[i].split(":");
                    updatedOptions.push(
                        {
                            label: tempVal[0].trim(),
                            value: tempVal[1].trim()
                        }
                    );
                }
                newField.options = updatedOptions;
            }

            FieldService
                .updateField(vm.formId,vm.fieldId,newField)
                .then(function(response) {
                   vm.fields = response.data;
                });


        }
    }

})();