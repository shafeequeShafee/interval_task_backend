const express = require("express");
const cors = require("cors");
const envEnvConfig = require("./nodeEnvConfig");
envEnvConfig.envEnvConfig();
const app = express();
const allowedOrigins = ["http://localhost:3000", "http://localhost:4000"];
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
