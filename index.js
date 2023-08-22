const express = require("express");
const cors = require("cors");
// imports
const { connection } = require("./Config/db");
const { userRouter } = require("./routes/UserRoute");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRouter);

app.listen(8500, async () => {
  try {
    await connection;
    console.log("Successfully connected to db.");
  } catch (error) {
    console.log("Error: while connecting to db: ", error);
  }
  console.log("Server started at 8500 port");
});
