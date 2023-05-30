const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const userRouter = require("./router/user_router.js");

dotenv.config();
const PORT = process.env.PORT || 5001;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT + " is running");
});
