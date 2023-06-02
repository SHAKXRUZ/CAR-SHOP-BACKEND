const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const usersRouter = require("./router/users_router.js");
const adminRouter = require("./router/admin_router.js");

const middleware = require("./middleware/users_middleware.js");

dotenv.config();
const PORT = process.env.PORT || 5001;

const app = express();
app.use(cors());
app.use(express.json());
app.use(middleware);

app.use("/users", usersRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT + " is running");
});
