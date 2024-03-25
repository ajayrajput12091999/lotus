import { response } from "express";
import axios from "axios";

class AuthController {
    auth = async (req, res, next) => {
        // console.log(req.headers);
        if (req.headers.authorization === undefined) {
            return res.status(200).send({ "success": false, "message": "Token required" });
        }
        if (req.headers.authorization === "") {
            return res.status(200).send({ "success": false, "message": "Token required" });
        }
        const verifyTokenResult = await this.verifyToken(req.headers.authorization);
        console.log("verifyToken");
        console.log(verifyTokenResult);
        if (verifyTokenResult === true) {
            next();
        } else {
            return res.status(200).send({ "success": false, "message": "Token expired" });
        }
    };

    verifyToken = async (token) => {
        // console.log(token);
        var token = token.replace("Bearer","");
        // console.log(token);return false;
        const API_URL = "http://127.0.0.1:8000/api/verifyToken";
        var verifyTokenResult = await axios.post(API_URL,
            {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
                token:token
            }
        );
        console.log(token);
        console.log(verifyTokenResult.data);
        if (verifyTokenResult.data.success === true) {
            return true;
        } else {
            return false;
        }

    }   
}


export default new AuthController();