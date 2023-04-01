const express = require("express");
const port = 500;
const app = express();
const { db } = require("./db/dbconfig");
const tasks = require("./routes/r_todo");

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/v1/todo", tasks);

//start server
const start = async () => {
  try {
    await db;
    await db.connect();
    console.log("Connection Done");
    await app.listen(
      port,
      console.log(`🚀Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
