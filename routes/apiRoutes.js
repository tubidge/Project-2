var db = require("../models");

module.exports = function (app) {
  // // Get all examples
  app.get("/api/todos", function (req, res) {
    db.Task.findAll({}).then(function (data) {
      res.json(data);
    });
  }); 

  //create a new todo task
  app.post("/api/todos", function (req, res) {
    // console.log(req.body);

    db.Task.create({
      id: req.body.id,
      task: req.body.task,
      SelectionId: req.body.SelectionId,
      UserId: req.session.passport.user
    }).then(function (data) {
      res.json(data);
    });
  });

  //update the completion status of the task
  app.put("/api/todos/complete/:id", function (req, res) {
    // console.log(req.body);

    db.Task.update({
      completed: req.body.completed
    }, {
        where: { id: req.body.id }
      }).then(function (data) {
        res.json(data);
      });
  });

  //update the task body
  app.put("/api/todos/:id", function (req, res) {
    //update the body of task at id
    // console.log(req.body);

    db.Task.update({
      task: req.body.task
    }, {
        where: { id: req.body.id }
      }).then(function (data) {
        res.json(data);
      });
  });

  //delete the task from the list, different from update completion
  app.delete("/api/todos/:id", function (req, res) {
    db.Task.destroy({ where: { id: req.params.id } }).then(function (data) {
      res.json(data);
    });
  });


  app.put("/api/selection/:id", function (req, res) {

    db.Selection.update({ active: req.body.active }, {

      where: { id: req.body.id }
    }).then(function (result) {
      res.json(result);
      console.log("updated active");

    });
  });
};