const fs = require("fs");
const chalk = require("chalk");

let logger = (req, res, next) => {
  //middleware function
  let current_DateTime = new Date();
  let formatted_date =
    current_DateTime.getFullYear() +
    "-" +
    (current_DateTime.getMonth() + 1) +
    "-" +
    current_DateTime.getDate() +
    " " +
    current_DateTime.getHours() +
    ":" +
    current_DateTime.getMinutes() +
    ":" +
    current_DateTime.getSeconds();

  let ipaddress = req.socket.remoteAddress;

  let operating_System = process.platform;
  if (operating_System == "win32" || operating_System == "win64") {
    operating_System = "Windows";
  } else if (operating_System == "darwin") {
    operating_System = "MacOS";
  } else if (operating_System == "linux") {
    operating_System = "Linux";
  }
  let method = req.method;
  let url = req.url;
  const start = process.hrtime();
  const durationInMilliseconds = getDuration_Milliseconds(start);

  let method_Chalk = chalk.bold.bgGrey;
  if (method == "GET") {
    method_Chalk = chalk.bold.green;
  } else if (method == "PUT") {
    method_Chalk = chalk.bold.blue;
  } else if (method == "POST") {
    method_Chalk = chalk.bold.yellow;
  } else if (method == "DELETE") {
    method_Chalk = chalk.bold.red;
  }

  let log = `Date and Time : ${formatted_date} - Method & URL : ${method}:${url} - IP Address : ${ipaddress} - OS : ${operating_System} - Duration:${
    durationInMilliseconds.toLocaleString() + "ms"
  }`;
  let cLI_Log = `[ Date and Time :${chalk.bold.blue(
    formatted_date
  )}] Method & URrl : ${method_Chalk(method)} : ${chalk.bold.blue(
    url
  )} / IP Address : ${chalk.bold.blue(ipaddress)}  OS : ${chalk.bold.blue(
    operating_System
  )} / Duration: ${chalk.bold.red(
    durationInMilliseconds.toLocaleString() + "ms"
  )}`;
  console.log(cLI_Log);
  fs.appendFile("request_logs.txt", log + "\n", (ex) => {
    if (ex) {
      console.log(ex);
    }
  });
  next();
};

const getDuration_Milliseconds = (start) => {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

module.exports = logger;
