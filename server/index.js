
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/task.js';
import userRouter from "./routes/user.js";

const app = express();
dotenv.config();

// middleware
app.use(function (req, res, next) {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // // Request methods you wish to allow
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // // Request headers you wish to allow
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // res.header('Access-Control-Allow-Origin', '*');
    // // Request methods you wish to allow
    // res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // // Request headers you wish to allow
    // res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    res.setHeader("Access-Control-Allow-Credentials", true);
    var origin = req.get('origin'); 

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', origin);

    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Credentials", true);

    next();
    });
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors({origin: '*'}));
// app.use((req, res, next) => {


app.use("/tasks", taskRoutes);
app.use("/user", userRouter);

app.get('/', (req,res) => {
    res.send('Hello to Hamami Calendar API');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology:true})
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error));
mongoose.set('useFindAndModify',false);