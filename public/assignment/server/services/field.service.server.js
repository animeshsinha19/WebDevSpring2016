module.exports = function(app, formModel) {

    // GET /api/assignment/form/:formId/field
    app.get("/api/assignment/form/:formId/field", getFieldByFormId);

    // GET /api/assignment/form/:formId/field/:fieldId
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldByFieldIdAndFormId);

    // DELETE /api/assignment/form/:formId/field/:fieldId
    app.delete("/api/assignment/form/:formId/field/:fieldId",deleteFieldByFieldIdAndFormId);

    // POST /api/assignment/form/:formId/field
    app.post("/api/assignment/form/:formId/field", createFieldByFormId);

    // PUT /api/assignment/form/:formId/field/:fieldId
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFieldIdAndFormId);

    function getFieldByFormId(req,res) {
        var formId = req.params.formId;
        //console.log(formId);
        var fields = formModel.getFieldByFormId(formId);
        //console.log(fields);
        res.json(fields);

    }
    function getFieldByFieldIdAndFormId(req,res) {

    }
    function deleteFieldByFieldIdAndFormId(req,res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        //console.log(fieldId);
        var newFields = formModel.deleteFieldByFieldIdAndFormId(formId,fieldId);
        res.json(newFields);

    }
    function createFieldByFormId(req,res) {
        var formId = req.params.formId;
        var field = req.body;
        var allFields = formModel.createFieldByFormId(formId,field);
        res.json(allFields);

    }
    function updateFieldByFieldIdAndFormId(req,res) {

    }


};