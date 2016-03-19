module.exports = function(app, formModel) {

    // GET /api/assignment/user/:userId/form
    app.get("/api/assignment/user/:userId/form", getFormsByUserId);

    // GET /api/assignment/form/:formId
    app.get("/api/assignment/form/:formId", getFormByFormId);

    // DELETE /api/assignment/form/:formId
    app.delete("/api/assignment/form/:formId", deleteFormByFormId);

    // POST /api/assignment/user/:userId/form
    app.post("/api/assignment/user/:userId/form", createForm);

    // PUT /api/assignment/form/:formId
    app.put("/api/assignment/form/:formId", updateFormByFormId);

    function getFormsByUserId(req,res) {
        var userId = req.params.userId;
        var allForms = formModel.findAllFormsForUser(userId);
        //console.log(allForms);
        res.json(allForms);
    }

    function getFormByFormId(req,res) {
        var formId = req.params.formId;
        var form = formModel.getFormByFormId(formId);
        res.json(form);
    }

    function deleteFormByFormId(req,res) {
        var formId = req.params.formId;
        var allForms = formModel.deleteFormById(formId);
        res.json(allForms);
    }

    function createForm(req,res) {
        var userId = req.params.userId;
        var form = req.body;
        var allForms = formModel.createFormForUser(userId,form);
        //console.log(allForms);
        res.json(allForms);

    }

    function updateFormByFormId(req,res) {
        var formId = req.params.formId;
        var newForm = req.body;
        var form = formModel.updateFormById(formId,newForm);
        //console.log(form);
        res.json(form);

    }

};