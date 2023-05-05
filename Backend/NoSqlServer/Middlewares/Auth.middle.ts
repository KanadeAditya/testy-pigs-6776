import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
require('dotenv').config();

interface TokenPayload {
  userID: string;
  role : string;
  status : boolean;
  email : string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: string;
        status: boolean;
        email: string;
      };
    }
  }
}

const AuthMiddleware = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if(!token){
      res.status(401).send({"msg": "login again"})
    }else{
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY) as TokenPayload;
      const { userID  , status ,email ,role} = decodedToken;
      req.user={userId:userID, status:status,email: email, role: role}
      next();
    }
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' ,error}); 
  }
};

export { AuthMiddleware };
