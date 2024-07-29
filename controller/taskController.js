const {
  getAllTaskService,
  updateTaskListService,
  nonBlockingApiService,
  blockingApiApiService,
  nonBlockingJsonService
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

const nonBlockingApi = async (req, res, next) => {
  try {
    let result = await nonBlockingApiService(req, res, next);
    if (result) {
      return res.status(200).json({
        status: 200,
        message: "Successfully fetched the data",
        error: false,
        response:result
      });
    }
  } catch (error) {
    next(error);
  }
};

const blockingApi = async (req, res, next) => {
  try {
    let result = await blockingApiApiService(req, res, next);
    if (result) {
      return res.status(200).json({
        status: 200,
        message: "Successfully fetched the data",
        error: false,
        response:result
      });
    }
  } catch (error) {
    next(error);
  }
};


const nonBlockingJson = async (req, res, next) => {
  try {
    let result = await nonBlockingJsonService(req, res, next);
    if (result) {
      return res.status(200).json({
        status: 200,
        message: "Successfully fetched the data",
        error: false,
        response:result
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTask,
  updateTaskList,
  nonBlockingApi,
  blockingApi,
  nonBlockingJson
};
