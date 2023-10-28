
require("dotenv").config();

let mongoose = require('mongoose');
const cors=require('cors');
let express = require("express");

let app = express();
let port = process.env.PORT || 8080;



app.use(cors({origin: true,credentials: true}));



let apiRoutes = require("./routes/Login-Routes");
let projectRoutes = require("./routes/Project-Routes");
let categoryRoutes = require("./routes/Category-Routes");
let deptRoutes = require("./routes/Dept-Route");
let reasonRoutes=require("./routes/Reason-Routes");
let divisionRoutes = require("./routes/Division-Routes");
let typeRoutes = require("./routes/Type-Route");
let priorityRoutes = require("./routes/Prioroty-Routes");
let locationRoutes = require("./routes/Location-Routes");


app.use(express.json());

app.use("/user", apiRoutes);
app.use("/project", projectRoutes);
app.use("/category",categoryRoutes);
app.use("/dept",deptRoutes);
app.use("/reason",reasonRoutes);
app.use("/division",divisionRoutes);
app.use("/type",typeRoutes);
app.use("/priority",priorityRoutes);
app.use("/location",locationRoutes);
app.listen(port, function () {
    

//connect to mongoose
const dbPath = 'mongodb://127.0.0.1:27017/TechPrimeLab';
const mongo = mongoose.connect(dbPath);
mongo.then(() => {
    console.log('connected');
}, error => {
    console.log(error, 'error');
})
  console.log("Running FirstRest on Port " + port);
});

