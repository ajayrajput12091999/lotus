import { validationResult } from "express-validator";
import Product from '../model/Product.js';

class ProductController {
    addProduct = async (req,res)=>{
        try {   
            var errors = await validationResult(req);
            if(errors.errors.length > 0){
                return res.status(200).send({"success":false,"message":errors.errors[0].msg});
            }else{
                var product =await new Product();
                product.product_name = req.body.product_name;
                product.product_description = req.body.product_description;
                product.category_name = req.body.category_name;
                product.product_image = "fsds";
                product.mrp = req.body.mrp;
                product.created_by = req.body.created_by;
                var result = await product.save();
                if(result){
                    return res.status(200).send({"success":true,"message":"Product saved successfully","data":result})
                }else{
                    return res.status(200).send({"success":false,"message":"Product not saved","data":[]});
                }
            }
        } catch (error) {
            
            return res.status(200).send({"success":false,"message":"Product not saved","data":error});
        }
    }

    getProduct = async (req,res)=>{
        try {
            var product = await Product.find({},{product_name:1,product_description:1,category_name:1,mrp:1})
                                    
            if(product.length > 0){
                return res.status(200).send({"success":true,"message":"Product found","data":product});
            }else{
                return res.status(200).send({"success":false,"message":"Product not found","data":[]});
            }    
        } catch (error) {
            return res.status(500).send({"success":false,"message":"Product not saved","data":error});
        }
    }

    getAdminProductByUserId = async(req,res)=>{
        try {   
            var errors = await validationResult(req);
            if(errors.errors.length > 0){
                return res.status(200).send({"success":false,"message":errors.errors[0].msg});
            }else{
                // console.log(req.body);
                // var products = await Product.find({"created_by":req.body.user_id});
                var products = await Product.find();
                // console.log(products);
                if(products.length > 0){
                    return res.status(200).send({"success":true,"message":"Product found successfully","data":products});
                }else{
                    return res.status(200).send({"success":false,"message":"Product not found","data":[]});
                }
            }
        } catch (error) {
            return res.status(200).send({"success":false,"message":"Product not found","data":error});
        }
    }

    getAdminProductByProductId = async(req,res)=>{
        try {   
            var errors = await validationResult(req);
            if(errors.errors.length > 0){
                return res.status(200).send({"success":false,"message":errors.errors[0].msg});
            }else{
                console.log(req.body);
                var products = await Product.find({"_id":req.body.product_id});
                console.log(products);
                if(products.length > 0){
                    return res.status(200).send({"success":true,"message":"Product found successfully","data":products});
                }else{
                    return res.status(200).send({"success":false,"message":"Product not found","data":[]});
                }
            }
        } catch (error) {
            return res.status(200).send({"success":false,"message":"Product not found","data":error});
        }
    }
    
    updateAdminProductByProductId = async(req,res)=>{
        try {   
            var errors = await validationResult(req);
            if(errors.errors.length > 0){
                return res.status(200).send({"success":false,"message":errors.errors[0].msg});
            }else{
                console.log(req.body);
                var products = await Product.find({"_id":req.body.product_id});
                console.log(products);
                if(products.length > 0){
                    products[0].product_name = req.body.product_name;
                    products[0].product_description = req.body.product_description;
                    products[0].mrp = req.body.mrp;
                    products[0].category_name = req.body.category_name;
                    products[0].product_image = "fsds";
                    const result = await products[0].save();
                    console.log(products);
                    if(result){
                        return res.status(200).send({"success":true,"message":"Product updated successfully","data":products});
                    }else{
                        return res.status(200).send({"success":false,"message":"Product not updated","data":[]});
                    }
                    
                }else{
                    return res.status(200).send({"success":false,"message":"Product not found","data":[]});
                }
            }
        } catch (error) {
            return res.status(200).send({"success":false,"message":"Product not found","data":error});
        }
    }

    deleteAdminProductByProductId = async(req,res)=>{
        try {   
            var errors = await validationResult(req);
            if(errors.errors.length > 0){
                return res.status(200).send({"success":false,"message":errors.errors[0].msg});
            }else{
                // console.log(req.body);
                var result = await Product.findByIdAndDelete(req.body.product_id);
                console.log(result);
                if(result){
                    return res.status(200).send({"success":true,"message":"Product deleted successfully","data":result});
                }else{
                    return res.status(200).send({"success":false,"message":"Product not deleted","data":[]});
                }
            }
        } catch (error) {
            return res.status(200).send({"success":false,"message":"Product not found","data":error});
        }
    }
}

export default new ProductController();