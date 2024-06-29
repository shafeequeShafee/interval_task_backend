const {
  getAllTaskService,
  updateTaskListService,
} = require("../service/taskControllerService");

const getAllTask = async (req, res, next) => {
  try {
    let result = await getAllTaskService(req, res, next);
    if (result) {
      return res.status(200).json({
        status: 200,
        message: "Successfully fetched.",
        response: result,
        error: false,
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateTaskList = async (req, res, next) => {
  try {
    let updated = await updateTaskListService(req, res, next);
    if (updated) {
      return res.status(200).json({
        status: 200,
        message: "Successfully updated.",
        error: false,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTask,
  updateTaskList,
};
