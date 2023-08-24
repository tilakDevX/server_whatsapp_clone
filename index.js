const express = require("express");
const cors = require("cors");
// imports
const { connection } = require("./Config/db");
const { userRouter } = require("./routes/UserRoute");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRouter);

const PORT = 8500;

connection.once("open", () => {
  console.log("Successfully connected to db.");

  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
});

connection.on("error", (error) => {
  console.error("Error connecting to db:", error);
});
