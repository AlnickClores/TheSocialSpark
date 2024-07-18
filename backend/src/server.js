const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//routes
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

app.use("/users", userRoute);
app.use("/auth", authRoute);

const port = 3000;

app.listen(port, () => {
  console.log("Listening from port: ", port);
});
