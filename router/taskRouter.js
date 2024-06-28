const express=require("express")
const taskRouter= express.Router()
const fileController =require("../controller/fileController")
const taskController =require("../controller/taskController")
taskRouter.post('upload-task-image',fileController.uploadTaskImage)
taskRouter.post('get-all-task',taskController.getAllTask)


module.exports=taskRouter