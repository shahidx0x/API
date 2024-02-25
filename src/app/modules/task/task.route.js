
const express = require('express');
const TaskController = require('./task.controller');
// const validateRequest = require("../../middleware/validateRequest");

const validateRequest = require('../../middleware/validateRequest');
const router = express.Router();
const TaskRoutes = router;

router.get("/get", validateRequest, TaskController.getTask);
router.post("/add", validateRequest, TaskController.createTask);
router.patch("/update/:id", validateRequest, TaskController.updateTask);
router.delete("/delete/:id", validateRequest, TaskController.deleteTask);

module.exports = TaskRoutes;