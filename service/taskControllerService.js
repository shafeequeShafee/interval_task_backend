const { query } = require("express");
const mysqlConnection = require("../config/mysqlConnection");

const getAllTaskService = async (req, res, next) => {
  return new Promise((resolve, reject) => {
    let query = "select * from tasks where is_active=1 order by id desc";
    mysqlConnection.query(query, (err, rows) => {
      if (!err) {
        resolve(rows);
      } else {
        reject(err);
      }
    });
  });
};

const updateTaskListService = async (req, res, next) => {
  return new Promise((resolve, reject) => {
    let query;
    console.log("hiii");
    // mysqlConnection.query(query,(err,rows)=>{
    //     if(!err){

    //     }
    //     else{
    //         reject(err)
    //     }
    // })
  });
};
module.exports = {
  getAllTaskService,
  updateTaskListService
};
