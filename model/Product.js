import mongoose  from "mongoose";

var ProductSchema = new mongoose.Schema({

    product_name :{
        type:String,
        required:true,
    },
    product_description :{
        type:String,
        required:true,
    },
    category_name:{
        type:String,
        required:true,
    },
    product_image:{
        type:String,
        required:true,
    },
    mrp:{
        type:String,
        default:1
    },
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

export default mongoose.model("Product",ProductSchema);