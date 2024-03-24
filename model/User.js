import mongoose from 'mongoose';

const UserSchema  = new mongoose.Schema({
     name:{
        type:String,
        required:true
     },
     email:{
        type:String,
        required:true
     },
     password:{
        type:String,
        required:true
     },
     mobile_number:{
        type:String,
        required:true
     },
     address:{
        type:String,
        required:true
     },
     role_id:{
        type:String,
        required:true
     },
     created_at:{
        type:Date,
        required:true,
        default:Date.now()
     }  
});

export default   mongoose.model('User',UserSchema);

