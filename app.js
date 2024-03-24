import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import errorHandler from './middleware/error.js';
import Routes from './routes/routes.js';
import user_routes  from "./routes/UserRoute.js"; 
import product_routes  from "./routes/ProductRoutes.js"; 
import order_routes from "./routes/OrderRoutes.js";

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

try {
  await mongoose.connect('mongodb://localhost:27017/test',console.log("conection is successfull "));
} catch (error) {
   throw error;
}

const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const corsoptions = {
  origin:'http://localhost:3000',credentials:true,optionSuccessStatus:200,'allowedHeaders':['data']
}
app.use(cors());
app.use(errorHandler);
app.use('/', Routes);
app.use('/api/user',user_routes);
app.use('/api/user/product',product_routes);
app.use('/api/user/order',order_routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})