
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/task.js';
import userRouter from "./routes/user.js";

const app = express();

// middleware
app.use(cors());
// app.use(bodyParser.json({limit:"30m", extended: true}));
// app.use(bodyParser.urlencoded({limit:"30m", extended: true}));

app.use('/tasks', taskRoutes);
app.use("/user", userRouter);

const CONNECTION_URL = 'mongodb+srv://hamamicalander:hamamicalander123@cluster0.w61v4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.send.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology:true})
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error));
mongoose.set('useFindAndModify',false);