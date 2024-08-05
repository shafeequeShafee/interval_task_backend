const { query, response } = require("express");
const mysqlConnection = require("../config/mysqlConnection");
const axios = require("axios");
const path = require("path");
const { Worker } = require("worker_threads");

const mysqlQueryExecution = (query) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(query, (err, rows) => {
      if (!err) {
        resolve(rows);
      } else {
        reject(err);
      }
    });
  });
};
const getAllTaskService = async (req, res, next) => {
  try {
    let query = "select * from tasks where is_active=1 order by id desc";
    let result = await mysqlQueryExecution(query);
    return result;
  } catch (err) {
    next(err);
  }
};

const updateTaskListService = async (req, res, next) => {
  try {
    let taskItems = req.body;
    console.log(taskItems);
    if (taskItems?.length > 0) {
      let updateQuery = "";
      let insertQuery = "";
      let duplicateTask = [];
      taskItems.map((data) => {
        let imageName = data?.image.toString();
        let currentItem = {
          id: data?.id,
          date: data?.date,
          heading: data?.heading,
          description: data?.description,
          time: data?.time,
          priority: data?.priority,
          image: imageName,
          flag: data?.flag,
        };
        if (currentItem?.id !== "" && currentItem?.id !== undefined) {
          duplicateTask.push(currentItem?.id);
          if (currentItem?.flag === true) {
            updateQuery += `update tasks set heading='${currentItem?.heading}', 
              description='${currentItem?.description}',
               priority='${currentItem?.priority}',time='${currentItem?.time}',image='${currentItem?.image}',
               date='${currentItem?.date}',is_active='1' where id='${currentItem?.id}';
              `;
          }
        } else {
          insertQuery += `insert into tasks (heading,description,priority,time,date,image,is_active) 
            values ('${currentItem?.heading}','${currentItem?.description}','${currentItem?.priority}',
            '${currentItem?.time}','${currentItem?.date}','${currentItem?.image}','1');
            `;
        }
      });

      if (duplicateTask?.length > 0) {
        updateQuery += `UPDATE tasks SET is_active='0' WHERE id NOT IN (${duplicateTask.join(
          ","
        )});`;
      }
      let query = updateQuery + insertQuery;
      let result = await mysqlQueryExecution(query);
      if (result) {
        return {
          status: 200,
          error: false,
          message: "Successfully updated",
        };
      } else {
        return {
          status: 200,
          error: false,
          message: "No data found",
        };
      }
    } else {
      let query = `update tasks set is_active='0'`;
      let result = await mysqlQueryExecution(query);
      if (result?.changedRows > 0) {
        return {
          status: 200,
          error: false,
          message: "Updated Successfully",
        };
      } else {
        return {
          status: 200,
          error: false,
          message: "No data found",
        };
      }
    }
  } catch (err) {
    next(err);
  }
};

const nonBlockingApiService = async (req, res, next) => {
  try {
    let result = [
      {
        name: "sfq",
        age: 27,
        job: "software engineer",
        message: "non-blocking api",
      },
    ];
    return result;
  } catch (err) {
    next(err);
  }
};

const blockingApiApiService = async (req, res, next) => {
  try {
    const now = new Date().getTime();
    while (new Date().getTime() < now + 10000) {}
    let result = [
      {
        name: "sfq",
        age: 27,
        job: "software engineer",
        message: "blocking api",
      },
    ];
    return result;
  } catch (err) {
    next(err);
  }
};

const nonBlockingJsonService = async (req, res, next) => {
  try {
    let result = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/1"
    );

    return result.data;
  } catch (err) {
    next(err);
  }
};

const blockingApiConvertedService = async (req, res, next) => {
  try {
    const worker = new Worker(
      path.join(__dirname, "..", "worker", "worker.js")
    );

    worker.on("message", (result) => {
      return res.send(result);
    });

    worker.on("error", (err) => {
      next(err);
    });

    worker.on("exit", (code) => {
      if (code !== 0) {
        next(new Error(`Worker stopped with exit code ${code}`));
      }
    });

    worker.postMessage("start");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllTaskService,
  updateTaskListService,
  nonBlockingApiService,
  blockingApiApiService,
  nonBlockingJsonService,
  blockingApiConvertedService,
};
