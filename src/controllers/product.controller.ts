import { NextFunction, Request,Response } from "express";
import Product from "../models/product"

//handler product file
const product = new Product();
//handling CRUD oprations
 export const createProduct =async (req: Request, res: Response,next : NextFunction) => {
        try {
            const u = await product.createProduct(req.body);
            res.json({
                msg: "done",
                data:{...u}
            });
        } catch (error) {
            next(error);
        }
};
export const getAllProducts =async (req: Request, res: Response,next : NextFunction) => {
    try {
        const u = await product.getAllProducts();
        res.json({
            msg: "done",
            data:{...u}
        });
    } catch (error) {
        next(error);
    }
};
 export const getOneProduct =async (req: Request, res: Response,next : NextFunction) => {
    try {
        const u = await product.getOneProduct(req.params.id as unknown as Number);
        res.json({
            msg: "done",
            data:{...u}
        });
    } catch (error) {
        next(error);
    }
};
export const UpdateProduct =async (req: Request, res: Response,next : NextFunction) => {
    try {
        const u = await product.UpdateProduct(req.body);
        res.json({
            msg: "done",
            data:{...u}
        });
    } catch (error) {
        next(error);
    }
};
export const DeleteProduct =async (req: Request, res: Response,next : NextFunction) => {
    try {
        const u = await product.DeleteProduct(req.params.id as unknown as Number );
        res.json({
            msg: "done",
            data:{...u}
        });
    } catch (error) {
        next(error);
    }
};




