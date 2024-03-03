import dotenv from 'dotenv';
dotenv.config({path: './config.env'});

const checkAdmin = async (req, res, next) => {
    const key = req.params.key;

    try {
        
        
        if(process.env.API !== key)
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
export default checkAdmin;