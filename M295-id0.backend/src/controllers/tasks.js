const { verifyToken } = require('../middleware/auth-handler');
const { APIResponse } = require('../utils/response');
const { GeneralError } = require('../utils/errors');
const { db } = require('../utils/db'); // your db module

function fetchTasks(req, res, next) {
  verifyToken(req, res, () => {
    if (req.token && req.email && req.uid) {
      db.tasks.fetch(req.id).then(function (response) {
        // console.log(response);
        if (response) {
          const data = response;
          const pong = new APIResponse(200, 'Your tasks list', data);
          return res.status(pong.code).json(pong);
        } else {
          let err = new GeneralError();
          return err.send(res);
        }
      });
    }
  });
}

function addTask(req, res) {
  verifyToken(req, res, () => {
    if (req.token && req.email && req.uid) {
      db.tasks.id().then((response) => {
        let tid = response.id;
        db.tasks.add(tid, req.uid, req.body.description).then(function () {
          db.tasks.get(tid, req.uid).then(function (response) {
            const data = response;
            const pong = new APIResponse(201, 'Your Task', data);
            return res.status(pong.code).json(pong);
          });
        });
      });
    }
  });
}

function getTask(req, res) {
  verifyToken(req, res, () => {
    if (req.token && req.email && req.uid) {
      db.tasks.get(req.params.uuid, req.uid).then(function (response) {
        const data = response;
        const pong = new APIResponse(200, 'Your Task', data);
        return res.status(pong.code).json(pong);
      });
    }
  });
}

function updateTask(req, res) {
  verifyToken(req, res, () => {
    if (req.token && req.email && req.uid) {
      db.tasks
        .update(req.params.uuid, req.uid, req.body.description)
        .then(function () {
          db.tasks.get(req.params.uuid, req.uid).then(function (response) {
            const data = response;
            const pong = new APIResponse(201, 'Your updated Task', data);
            return res.status(pong.code).json(pong);
          });
        });
    }
  });
}

function deleteTask(req, res) {
  verifyToken(req, res, () => {
    if (req.token && req.email && req.uid) {
      db.tasks.remove(req.params.uuid, req.uid).then(() => {
        db.tasks.get(req.params.uuid, req.uid).then(function (response) {
          // res.header("Content-Type", "application/json")
          if (response !== null) {
            let err = new GeneralError('Unexcepted');
            return err.send(res);
          } else {
            // Pitfall: Status Code 204
            // express response objects will not forward a response body if the response status code is 204 No Content.
            const data = {};
            const pong = new APIResponse(201, 'Task deleted', data);
            return res.status(pong.code).json(pong);
          }
        });
      });
    }
  });
}

module.exports = {
  fetchTasks,
  addTask,
  getTask,
  updateTask,
  deleteTask,
};
