const { query } = require("express")
// const mysqlConnection =require("../config/mysqlConnection")

const getAllTaskService =async(req,res,next)=>{
    return new Promise((resolve,reject)=>{
        let query
        console.log("hiii")
        // mysqlConnection.query(query,(err,rows)=>{
        //     if(!err){

        //     }
        //     else{
        //         reject(err)
        //     }
        // })
    })

}
module.exports={
    getAllTaskService
}