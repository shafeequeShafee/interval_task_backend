const { taskImageUpload } = require("../controller/upload");
const uploadTaskImage = async (req, res, next) => {
  taskImageUpload(req, res, async (error) => {
    try {
      if (error) {
        console.log("File upload failed: ", error);
        return res.status(400).json({
          status: 400,
          message: error.message,
          error: true,
        });
      }
      const file = req.files;
      let fileNames = [];
      if (file) {
        for (i = 0; i < file.length; i++) {
          const currentFile = file[i];
          fileNames.push(currentFile.filename);
        }
        return res.status(200).json({
          status: 200,
          message: "Files uploaded Successfully.",
          error: false,
          response: fileNames.join(","),
        });
      }
    } catch (err) {
      next(err);
    }
  });
};

module.exports = {
  uploadTaskImage,
};
