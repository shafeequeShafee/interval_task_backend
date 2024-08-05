const express = require("express"); //
const cors = require("cors");
const envEnvConfig = require("./nodeEnvConfig");
envEnvConfig.envEnvConfig();
const app = express();
const allowedOrigins = ["http://localhost:3000", "http://localhost:4000"];
app.use(express.static("uploads"))
const taskRouter = require("./router/taskRouter");
app.use(
  cors({
    origin: (origin, callback) => {
      console.log(origin, "origin");
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
//(req,res)=>{} request handler , request object, resoponse object
//("/")=> router or endpoint
app.get("/",(req,res)=>{
   res.status(200).send("hii")
})

/// route parameter
app.get("/api/user/:id/:username",(req,res)=>{
    console.log(req.params)
    let parsedId =req.params?.id
    if(isNaN(parsedId)){
      return req.status(400).send({
        msg:"bad request"
      })
    }
    /// do other operation
    // req.status(404) => no data found 
    // req.status(200) => OK success

})
//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/task-router", taskRouter);
app.all("*", (req, res, next) => {
  const err = new Error(`Requested URL ${req.path} not found !`);
  err.statusCode = 404;
  next(err);
});
app.use((err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: true,
    message: err.message,
  });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
