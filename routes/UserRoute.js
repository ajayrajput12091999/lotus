import  express  from 'express';
import UserController from '../controller/UserController.js';
import { check } from 'express-validator';
import  AuthController  from '../middleware/checkAuth.js';

const routes = express.Router();

routes.post('/register',[
    check('name','Name is required !').not().isEmpty(),
    check('email','Email is required !').not().isEmpty(),
    check('password','Password is required !').not().isEmpty(),
    check('mobile_number','Mobile number is required !').not().isEmpty(),
    check('address','Address is required !').not().isEmpty(),
    check('role_id','Role is required !').not().isEmpty(),
],UserController.register);

routes.post('/login',[
   check('email','Email is required !').not().isEmpty(),
   check('password','Password is required !').not().isEmpty(),
],UserController.login);

routes.post('/getuser',AuthController.auth,[
  check('user_id','User id is required').not().isEmpty(),
],UserController.getUser);

routes.get('/test',UserController.testAPi);

export default routes;