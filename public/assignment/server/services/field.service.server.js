module.exports = function (app, formModel) {

    // GET /api/assignment/form/:formId/field
    app.get("/api/assignment/form/:formId/field", getFieldsByFormId);

    // GET /api/assignment/form/:formId/field/:fieldId
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldByFieldIdAndFormId);

    // DELETE /api/assignment/form/:formId/field/:fieldId
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFieldIdAndFormId);

    // POST /api/assignment/form/:formId/field
    app.post("/api/assignment/form/:formId/field", createFieldByFormId);

    // PUT /api/assignment/form/:formId/field/:fieldId
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFieldIdAndFormId);

    function getFieldsByFormId(req, res) {
        var formId = req.params.formId;
        formModel
            .getFieldsByFormId(formId)
            .then(function (response) {
                //console.log(response);
                res.json(response);

            });
        //var fields = formModel.getFieldByFormId(formId);
        //res.json(fields);

    }

    function getFieldByFieldIdAndFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = formModel.getFieldByFieldIdAndFormId(formId, fieldId);
        res.json(field);
    }

    function deleteFieldByFieldIdAndFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        //console.log(fieldId);
        formModel
            .deleteFieldByFieldIdAndFormId(formId, fieldId)
            .then(function (response) {
                res.json(response);
            });

        //var newFields = formModel.deleteFieldByFieldIdAndFormId(formId, fieldId);
        //res.json(newFields);

    }

    function createFieldByFormId(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        formModel
            .createFieldByFormId(formId, field)
            .then(function (response) {
                res.json(response);
            });
        //var allFields = formModel.createFieldByFormId(formId, field);
        //res.json(allFields);

    }

    function updateFieldByFieldIdAndFormId(req, res) {

    }


};