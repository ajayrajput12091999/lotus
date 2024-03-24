import  express from "express";
import { check } from "express-validator";
import AuthController from "../middleware/checkAuth.js";
import ProductController from "../controller/ProductController.js";

const route = express.Router();

route.post('/create',AuthController.auth,[
    check('product_name','Product name is empty').not().isEmpty(),
    check('product_description','Product discription is empty').not().isEmpty(),
    check('mrp','Mrp is empty').not().isEmpty(),
    check('category_name','Category name is empty').not().isEmpty(),
    check('created_by','Created by is empty').not().isEmpty(),
    // check('product_image','Product image is empty').not().isEmpty(),
],ProductController.addProduct);

route.post('/updateAdminProductByProductId',AuthController.auth,[
    check('product_name','Product name is empty').not().isEmpty(),
    check('product_description','Product discription is empty').not().isEmpty(),
    check('mrp','Mrp is empty').not().isEmpty(),
    check('category_name','Category name is empty').not().isEmpty(),
    check('product_id','Product Id is empty').not().isEmpty(),
    // check('product_image','Product image is empty').not().isEmpty(),
],ProductController.addProduct);
    
route.post('/getAdminProductByUserId',AuthController.auth,[
    check('user_id','User id is empty').not().isEmpty(),
],ProductController.getAdminProductByUserId);

route.post('/getAdminProductByProductId',AuthController.auth,[
    check('product_id','Product id is empty').not().isEmpty(),
],ProductController.getAdminProductByProductId);


route.post('/deleteAdminProductByProductId',AuthController.auth,[
    check('product_id','Product id is empty').not().isEmpty(),
],ProductController.deleteAdminProductByProductId);

route.get('/getProduct',ProductController.getProduct);

export default route;
