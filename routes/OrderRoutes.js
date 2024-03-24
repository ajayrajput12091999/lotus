import  express from "express";
import { check } from "express-validator";
import AuthController from "../middleware/checkAuth.js";
import OrderController from "../controller/OrderController.js";

const route = express.Router();

route.post('/placeOrder',AuthController.auth,[
    check('customer_name','Customer name is empty').not().isEmpty(),
    check('created_by','Created By is empty').not().isEmpty(),
    check('total_amount','Total Amount is empty').not().isEmpty(),
    check('order_date','Order Date is empty').not().isEmpty(),
    check('payment_type','Payment Type is empty').not().isEmpty(),
    check('address','Address is empty').not().isEmpty(),
    check('address','Address is empty').not().isEmpty(),
    check('created_by','Created by is empty').not().isEmpty(),
    check('products.*.product_name','Product Name is empty').not().isEmpty(),
    check('products.*.product_id','Product id is empty').not().isEmpty(),
    check('products.*.mrp','Product mrp is empty').not().isEmpty(),
    check('products.*.product_description','Product description is empty').not().isEmpty(),
    check('products.*.category_description','Categroy is empty').not().isEmpty(),
    // check('product_image','Product image is empty').not().isEmpty(),
],OrderController.placeOrder);

route.post('/getOrderDetailByUserId',AuthController.auth,[
    check('user_id','Customer is is empty').not().isEmpty(),
],OrderController.getOrderDetailByUserId);
route.post('/getOrderDetailById',AuthController.auth,[
    check('order_id','Order id is empty').not().isEmpty(),
],OrderController.getOrderDetailById);
route.post('/getOrders',AuthController.auth,[
    check('user_id','Customer id is empty').not().isEmpty(),
],OrderController.getOrders);

route.post('/getAdminDashboardDetails',AuthController.auth,OrderController.getAdminDashboardDetails);

export default route;
