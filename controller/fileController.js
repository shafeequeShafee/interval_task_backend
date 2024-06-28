const {taskImageUpload}=require("../controller/upload")
const uploadTaskImage = async (req,res,next)=>{
    try{
        taskImageUpload(req,res,async(error)=>{
            if(error){
                console.log("File upload failed: ",error)
                return res.staus(400).json({
                    status:400,
                    message:error.message,
                    error:true
                })
            }
            const file=req.file
            let fileNames=[]
            if(file){
                for(i=0; i<file.length;i++){
                    const currentFile=file[i]
                    fileNames.push(currentFile.filename)

                }
                return res.staus(200).json({
                    status:200,
                    message:'Files uploaded Successfully.',
                    error:false,
                    response:fileNames.join(",")
                })

            }


        })
    }
    catch(err){
        next(err)
    }
}


module.exports={
    uploadTaskImage
}