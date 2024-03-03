import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import errorHandler from './middleware/error.js';
import Routes from './routes/routes.js';


dotenv.config({path: './config.env'});
const DB = process.env.DATABASE;

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connection Successful");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use(errorHandler);
app.use('/', Routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})