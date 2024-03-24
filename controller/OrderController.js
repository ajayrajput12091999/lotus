import { validationResult } from "express-validator";
import Order from '../model/Order.js';
import Product from "../model/Product.js";

class OrderController {
    placeOrder = async (req, res) => {
        try {
            var errors = await validationResult(req);
            if (errors.errors.length > 0) {
                return res.status(200).send({ "success": false, "message": errors.errors[0].msg });
            } else {
                var order = new Order();
                order.customer_name = req.body.customer_name;
                order.created_by = req.body.created_by;
                order.payment_type = req.body.payment_type;
                order.total_amount = req.body.total_amount;
                order.address = req.body.address;
                order.order_status = req.body.order_status;
                order.order_date = req.body.order_date;
                console.log(req.body);
                var pro = req.body.products.map(product => {
                    return {
                        product_id: product.product_id,
                        product_name: product.product_name,
                        product_description: product.product_description,
                        category_name: product.category_description,
                        mrp: product.mrp,
                    };
                });

                order.products = pro;
                // return "hello";
                // console.log(pro);return false;
                var result = await order.save();
                console.log(order);
                if (result) {

                    return res.status(200).send({ "success": true, "message": "Order saved successfully", "data": result })
                } else {
                    return res.status(200).send({ "success": false, "message": "Order cnot saved", "data": order });
                }
            }
        } catch (error) {

            return res.status(200).send({ "success": false, "message": "Order notff saved", "data": error });
        }
    }

    getOrderDetailByUserId = async (req, res) => {
        try {
            var errors = await validationResult(req);
            if (errors.errors.length > 0) {
                return res.status(200).send({ "success": false, "message": errors.errors[0].msg });
            } else {
                var order = await Order.find({});
                if (order.length > 0) {
                    return res.status(200).send({ "success": true, "message": "Order found", "data": order });
                } else {
                    return res.status(200).send({ "success": false, "message": "Order not found", "data": [] });
                }
            }

        } catch (error) {
            return res.status(500).send({ "success": false, "message": "Order not found", "data": error });
        }
    }
    getOrderDetailById = async (req, res) => {
        try {
            var errors = await validationResult(req);
            if (errors.errors.length > 0) {
                return res.status(200).send({ "success": false, "message": errors.errors[0].msg });
            } else {
                console.log(req.body);
                var order = await Order.find({"_id":req.body.order_id});
                if (order.length > 0) {
                    return res.status(200).send({ "success": true, "message": "Order found", "data": order });
                } else {
                    return res.status(200).send({ "success": false, "message": "Order not found", "data": [] });
                }
            }

        } catch (error) {
            return res.status(500).send({ "success": false, "message": "Order not found", "data": error });
        }
    }

    getOrders = async (req, res) => {
        try {
            var errors = await validationResult(req);
            if (errors.errors.length > 0) {
                return res.status(200).send({ "success": false, "message": errors.errors[0].msg });
            } else {
                // console.log(req.body);
                // var products = await Product.find({"created_by":req.body.user_id});
                var order = await Order.find();
                // console.log(products);
                if (order.length > 0) {
                    return res.status(200).send({ "success": true, "message": "Order found successfully", "data":order });
                } else {
                    return res.status(200).send({ "success": false, "message": "Order not found", "data": [] });
                }
            }
        } catch (error) {
            return res.status(200).send({ "success": false, "message": "Product not found", "data": error });
        }
    }

    getAdminDashboardDetails = async (req, res) => {
        try {
            var errors = await validationResult(req);
            if (errors.errors.length > 0) {
                return res.status(200).send({ "success": false, "message": errors.errors[0].msg });
            } else {
                var order = await Order.find({});
                // var totalAmount = await Order.aggregate([
                //     {
                //         $group:{
                //             _id:null,
                //             total_amount:{
                //                   $sum  :"$total_amount",
                //                 //   count:{$sum:1}
                //             }
                //         }
                //     }
                // ]);

                var total_amount = 0;
                var totalAmount = order.map((o)=>{
                    total_amount += total_amount + parseFloat(o.total_amount);
                    // console.log(o);
                    return true;
                });
                var product = await Product.find({}).count();
                var data = {
                    "total_order":order.length,
                    "total_product":product,
                    "total_sale":total_amount
                };
                return res.status(200).send({ "success": true, "message": "Details found successfully", "data": data });
            }
        } catch (error) {
            return res.status(200).send({ "success": false, "message": "Details not found", "data": error });
        }
    }
}

export default new OrderController();