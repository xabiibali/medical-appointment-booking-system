// middleware
import jwt from "jsonwebtoken";
import 'dotenv/config';

const SECRET_KEY = process.env.SECRET_KEY;

function authenticate(req, res, next) {
    const token = req.headers.authorization;
    console.log("TOKEN", token);
  
    if (!token) {
        return res.status(401).json({
            message: 'Authentication failed: No token provided'
        });
    }

    const tokenWithoutBearer = token.split(' ')[1];

    jwt.verify(tokenWithoutBearer, SECRET_KEY, (error, decoded) => {
        if (error) {
            if (error) {
                return res.status(401).json({
                    message: 'Authentication failed Token'
                });
            } 
        }

        req.decoded = decoded;
        next();
    });
}

export default authenticate;