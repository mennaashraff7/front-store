import { NextFunction, Request,Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

const {
    TOKEN_SECRET,
} = process.env;

//handler user file
const user = new User();
//handling CRUD oprations
 export const create =async (req: Request, res: Response,next : NextFunction) => {
        try {
            const u = await user.create(req.body);
            var token = jwt.sign({ user: u }, TOKEN_SECRET as string);
            const resResult = {
                data:{...u},
                token: token
            }
            res.json(resResult);
        } catch (error) {
            next(error);
            res.status(400);
        }
        
};
export const getAllUsers =async (req: Request, res: Response,next : NextFunction) => {
    try {
        const u = await user.getAllUsers();
        const resResult = {
            data:{...u}
        }
        res.json(resResult);
    } catch (error) {
        next(error);
    }
};
 export const getOneUser =async (req: Request, res: Response,next : NextFunction) => {
    try {
        const u = await user.getOneUser(req.params.id as unknown as Number);
        const resResult = {
            data:{...u}
        }
        res.json(resResult);
    } catch (error) {
        next(error);
    }
};
export const UpdateUser =async (req: Request, res: Response,next : NextFunction) => {
    try {
        const u = await user.Update(req.body);
        const resResult = {
            data:{...u},
            
        }
        res.json(resResult);
    } catch (error) {
        next(error);
    }
};
export const DeleteUser =async (req: Request, res: Response,next : NextFunction) => {
    try {
        const u = await user.DeleteUser(req.params.id as unknown as Number );
        const resResult = {
            data:{...u},
             
        }
        res.json(resResult);
    } catch (error) {
        next(error);
    }
};




