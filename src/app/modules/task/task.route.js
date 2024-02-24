
const express = require('express');
const TaskController = require('./task.controller');
const router = express.Router();
const TaskRoutes = router;

router.get(
    '/get',
    TaskController.getTask
);

router.post(
    '/add',
    TaskController.createTask
);

router.patch(
    '/update/:id',
    TaskController.updateTask
);

router.delete(
    '/delete/:id',
    TaskController.deleteTask
);



module.exports = TaskRoutes;