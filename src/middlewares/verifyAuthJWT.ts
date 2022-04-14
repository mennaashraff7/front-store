import express from 'express';
import jwt from 'jsonwebtoken';



const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const authHeader = (req.headers.authorization) as string;
        const token = authHeader.split(' ')[1];
        const decode = (jwt.verify(token, process.env.TOKEN_SECRET as string));
        
        next();
    }catch(err){
        res.status(401);
        res.json(` 401: Unauthorized (Access denied)`);
    }
}

export default verifyToken;