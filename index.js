const express = require("express"); //
const cors = require("cors");
const envEnvConfig = require("./nodeEnvConfig");
envEnvConfig.envEnvConfig();
const app = express();
const allowedOrigins = ["http://localhost:3000", "http://localhost:4000"];
app.use(express.static("uploads"));
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
app.get("/", (req, res) => {
  res.status(200).send("hii");
});

////////  => route parameter
//=> /api/user/5/sfq
app.get("/api/user/:id/:username", (req, res) => {
  console.log(req.params);
  let parsedId = req.params?.id;
  if (isNaN(parsedId)) {
    return req.status(400).send({
      msg: "bad request",
    });
  }
  /// do other operation
  // req.status(404) => no data found
  // req.status(200) => OK success
});

///////// => query parameter
// => /api/products?keyOne=valueOne&keyTwo=valueTwo
app.get("/api/products", (req, res) => {
  console.log(req.query?.keyOne, req.query?.keyTwo);
});
//////////////////

// let req={
//   query:{
//       name:"sfq",
//       age:27
//   },
//   params:{
//       id:1,
//       page:10
//   }
// }
// let {query:{
//   name,age
// },params}=req

// console.log("params",params)  =>params { id: 1, page: 10 }
// console.log("name",name) =>name sfq

////////////////

/////// => post request ,  body => payload
/// => post requestil req til ninnu data  json formatil pass cheyyan middleware vennam
////=> app.use() => used to register middleware
///=> app.use(express.json());

app.post("/api/users", (req, res) => {
  //console.log(req.body)=> undefined
  return res.status(200).send({
    msg: "hiiii",
  });
});

///// status(201) => created
app.use(express.json());

app.post("/api/users/create",(req,res)=>{
   return res.status(201).send({
    msg:"created"
   })
})


/////// put request & patch are used to update data but technically different on how u update data

//// update entire resource(record)
app.put("",(req,res)=>{

})

//// patch request updata a record partially
app.patch("",(req,res)=>{
  
})


//// delete => used to delete record from 
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
