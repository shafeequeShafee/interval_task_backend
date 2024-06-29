const express = require("express");
const taskRouter = express.Router();
const fileController = require("../controller/fileController");
const taskController = require("../controller/taskController");
taskRouter.post("/upload-task-image", fileController.uploadTaskImage);
taskRouter.get("/get-all-task", taskController.getAllTask);
taskRouter.post("/update-task-list", taskController.updateTaskList);

module.exports = taskRouter;
