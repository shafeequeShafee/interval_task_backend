const multer = require("multer");
const moment = require("moment");
const envEnvConfig = require("../nodeEnvConfig");
envEnvConfig.envEnvConfig();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    const originalFileName = file.originalname;
    const fileExtensionWithName = originalFileName.split(".");
    const currentDate = moment().format("YYYY-MM-DD_HH-mm-ss");
    const filename = `${fileExtensionWithName[0]}_${currentDate}.${fileExtensionWithName[1]}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  let allowedFileTypes;
  if (file.fieldname === "file") {
    allowedFileTypes = ["image/png", "image/jpg", "image/jpeg"];
  }
  if (allowedFileTypes.includes(file.mimetype)) {
    console.log("Allowed file type : ", file.mimetype);
    cb(null, true);
  } else {
    console.log("Invalid file type : ", file.mimetype);
    cb(
      file.fieldname === "file" &&
        new Error("Invalid file type. Only png files are allowed.")
    );
  }
};

// const taskImageUpload = multer({
//    storage,
//    fileFilter: fileFilter,
//    limits: { fileSize: 4000000 },
// }).single('file')

const taskImageUpload = multer({
  storage,
  fileFilter: fileFilter,
  limits: { fileSize: 4000000 },
}).array("file", 10);

module.exports = { taskImageUpload };
