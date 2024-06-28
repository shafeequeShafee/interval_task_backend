const { error } = require("console")
const {
    getAllTaskService
} =require("../service/taskControllerService")

const getAllTask =async(req,res,next)=>{
    try{
        let updated=await getAllTaskService(req,res,next) 
        if(updated){
            return res.status(200).json({
               status:200,
               message:"Successfully updated.", 
               error:false
            })
        }
      
    }
    catch(error){
        next(error)
    }

}

module.exports={
    getAllTask
}