import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import taskRoutes from "./routes/task.js";
import userRouter from "./routes/user.js";
// import Agenda from "agenda";
import {SECRETS} from './secrets.js'

const app = express();

// const mongoConnectionString =SECRETS.CONNECTION_URL;
// const agenda = new Agenda({
//   db: {
//     address: mongoConnectionString,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
// });

// middleware
// app.use(function (req, res, next) {
//     // deployment??????
//     // res.setHeader('Access-Control-Allow-Origin', '*');
//     // // Request methods you wish to allow
//     // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // // Request headers you wish to allow
//     // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//     // res.header('Access-Control-Allow-Origin', '*');
//     // // Request methods you wish to allow
//     // res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // // Request headers you wish to allow
//     // res.header('Access-Control-Allow-Headers', 'Content-Type');
//     // res.setHeader('Access-Control-Allow-Origin', '*');
//     // res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     // res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
//     // res.setHeader("Access-Control-Allow-Credentials", true);
//     // var origin = req.get('origin');

//     // res.header('Access-Control-Allow-Origin', '*');
//     // res.header('Access-Control-Allow-Origin', origin);

//     // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     // res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
//     // res.header("Access-Control-Allow-Credentials", true);
//     // next();
//     // end deployment
//     // start development
//     next();
//     });
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use("/tasks", taskRoutes);
app.use("/user", userRouter);

const PORT = SECRETS.PORT;

mongoose
  .connect(SECRETS.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error));