const { query, response } = require("express");
const mysqlConnection = require("../config/mysqlConnection");

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

module.exports = {
  getAllTaskService,
  updateTaskListService,
};
