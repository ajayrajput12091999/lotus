import jwt from "jsonwebtoken";
import Customer from "../model/userSchema.js";

const checkAuth = async (req, res, next) => {
    const id = req.params.id;
    const token = req.params.token;
    try {
        const user = await Customer.findOne({id: id});
        
        if(!user.token.includes(token))
        return res.status(401).json({
            message: 'Auth Failed'
        });
        //const decoded = jwt.verify(token, '');
        next();
        
 
    } catch (error) {
        res.status(401).json({
            message: 'Auth Failed'
        });
    }
};
export default checkAuth;
