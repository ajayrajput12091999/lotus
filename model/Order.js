import mongoose  from "mongoose";

var OrderSchema = new mongoose.Schema({

    customer_name :{
        type:String,
        required:true,
    },
    order_date :{
        type:Date,
        required:true,
        default:Date.now()
    },
    order_status:{
        type:Number,
        required:true,
        default:1
    },
    total_amount:{
        type:String,
        default:0
    },
    address:{
        type:String,
        required:true,
    },
    payment_type:{
        type:String,
        required:true,
    },
    products:[
        {
            product_name:{
                type:String,
                required:true,
            },
            product_description:{
                type:String,
                required:true,
            },
            product_id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true,  
            },
            category_name:{
                type:String,
                required:true,
            },
            mrp:{
                type:String,
                required:true,
            },
        }
    ],
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    created_at:{
        type:Date,
        default:Date.now(),
    },
    updated_at:{
        type:Date,
        default:Date.now(),
    },

});

export default mongoose.model("Order",OrderSchema);