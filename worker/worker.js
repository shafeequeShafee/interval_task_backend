const { parentPort } = require("worker_threads");

parentPort.on("message", (data) => {
  const now = new Date().getTime();
  while (new Date().getTime() < now + 10000) {}
  let result = [
    {
      name: "sfq",
      age: 27,
      job: "software engineer",
      message: "blocking api",
    },
  ];
  parentPort.postMessage(result);
});
