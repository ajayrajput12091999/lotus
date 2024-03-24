import { validationResult } from 'express-validator';
import User from '../model/User.js';
import bcrypt from 'bcrypt';
import  jwt  from 'jsonwebtoken';
import url from 'url';

class UserController{
   
   hashPassword = async (password)=>{
         var hashed_password = await bcrypt.hash(password,10);
         return hashed_password;
   }

   createJwtToken = async (user_id) => {
       var token = await jwt.sign({'user_id':user_id},'123456');
       return token;
   }

   register = async (req,res)=>{
      try {
         var errors  = await validationResult(req);
          
         if(errors.errors.length){
            return res.status(200).send({"success":false,"message":errors.errors[0].msg});
         } 

         var checkDuplicate = await User.find({"email":req.body.email});
         
         if(checkDuplicate.length > 0){
            return res.status(200).send({"success":false,"message":"Email already exist"});
         }

         var pass =  await this.hashPassword(req.body.password);
         
         var user = new User({
             'name':req.body.name,
             'email':req.body.email,
             'password':pass,
             'mobile_number':req.body.mobile_number,
             'address':req.body.address,
             'role_id':req.body.role_id,
         });
         var result = await user.save();
         if(result){
            return res.status(200).send({"success":true,"message":"User registered successfully !"});
         }else{
            return res.status(200).send({"success":false,"message":"User not registered !"});
         }
         
      } catch (error) {
         console.log(error);
         return res.status(500).send(error);
      }   
   }

   login = async (req,res)=>{
       try {
         
         var errors = await validationResult(req);
         
         if(errors.errors.length > 0){
            return res.status(200).send({"success":false,"message":errors.errors[0].msg});
         }else{

            var checkDuplicate = await User.find({"email":req.body.email});
            if(checkDuplicate.length == 0){
               return res.status(200).send({"success":false,"message":"User not exist"});
            }else{
               
               var checkPassword = await bcrypt.compare(req.body.password,checkDuplicate[0].password);
               if(checkPassword){
                  // console.log("yes");
                  // var b = await  jwt.destroy({'user_id':checkDuplicate[0]._id}); 
                  // console.log("yes");
                  var tok = await this.createJwtToken(checkDuplicate[0]._id);
                  
                  return res.status(200).send({"success":true,"message":"Login successfully",'data':checkDuplicate,'token':tok});                      
               }else{
                  return res.status(200).send({"success":true,"message":"Password does not match"});                        
               }
            }
         }
         
       } catch (error) {
         return res.status(500).send({'success':false,'message':error});
       }
   }

   getUser = async (req,res)=> {
      
         
      try {
         var errors = await validationResult(req);

         if(errors.errors.length > 0){
            return res.status(200).send({"success":false,"message":errors.errors[0].msg});
         }else{
            var user = await User.find({'_id':req.body.user_id},{'__v':0});
            console.log(user);
            if(user.length > 0){
               return res.status(200).send({"success":true,"message":"User data found",'data':user}); 
            }else{
               return res.status(200).send({"success":false,"message":"User not found",'data':[]}); 
            }
            
         }  
      } catch (error) {
         return res.status(200).send({"success":false,"message":error}); 
      } 
                           
   }

   testAPi = (req,res)=>{
      var query = url.parse(req.url,true).query;

      console.log(query.id);
   }
}
export default new UserController();