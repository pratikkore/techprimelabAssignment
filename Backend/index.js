require("dotenv").config();
const crypto = require("crypto");
const fs = require("fs");

let mongoose = require("mongoose");
const cors = require("cors");
let express = require("express");
const checkToken = require('./Auth');

let app = express();
let port = 8000;

app.use(cors({ origin: true, credentials: true }));

const secretKey = crypto.randomBytes(32).toString("hex");

fs.writeFileSync(".env", `JWT_SECRET=${secretKey}`);


let apiRoutes = require("./routes/Login-Routes");
let projectRoutes = require("./routes/Project-Routes");
let categoryRoutes = require("./routes/Category-Routes");
let deptRoutes = require("./routes/Dept-Route");
let reasonRoutes = require("./routes/Reason-Routes");
let divisionRoutes = require("./routes/Division-Routes");
let typeRoutes = require("./routes/Type-Route");
let priorityRoutes = require("./routes/Prioroty-Routes");
let locationRoutes = require("./routes/Location-Routes");

app.use(express.json());
app.use('/protected', checkToken);

app.use("/user", apiRoutes);
app.use("/protected/project", projectRoutes);
app.use("/protected/category", categoryRoutes);
app.use("/protected/dept", deptRoutes);
app.use("/protected/reason", reasonRoutes);
app.use("/protected/division", divisionRoutes); 
app.use("/protected/type", typeRoutes);
app.use("/protected/priority", priorityRoutes);
app.use("/protected/location", locationRoutes);
app.listen(port, function () {
  //connect to mongoose
  const dbPath = "mongodb://127.0.0.1:27017/TechPrimeLab";
  const mongo = mongoose.connect(dbPath);
  mongo.then(
    () => {
      console.log("connected");
    },
    (error) => {
      console.log(error, "error");
    }
  );
  console.log("Running FirstRest on Port " + port);
});
