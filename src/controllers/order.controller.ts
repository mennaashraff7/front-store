import { NextFunction, Request,Response } from "express";
import Order from "../models/order"

//handler order file
const order = new Order();
//handling CRUD oprations
 export const createOrder =async (req: Request, res: Response,next : NextFunction) => {
        try {
            const u = await order.createOrder(req.body);
            res.json({
                msg: "done",
                data:{...u}
            });
        } catch (error) {
            next(error);
        }
};
export const getAllOrders =async (req: Request, res: Response,next : NextFunction) => {
    try {
        const u = await order.getAllOrders();
        res.json({
            msg: "done",
            data:{...u}
        });
    } catch (error) {
        next(error);
    }
};
 export const getOneOrder =async (req: Request, res: Response,next : NextFunction) => {
    try {
        const u = await order.getOneOrder(req.params.id as unknown as Number);
        res.json({
            msg: "done",
            data:{...u}
        });
    } catch (error) {
        next(error);
    }
};
export const UpdateOrder =async (req: Request, res: Response,next : NextFunction) => {
    try {
        const u = await order.UpdateOrder(req.body);
        res.json({
            msg: "done",
            data:{...u}
        });
    } catch (error) {
        next(error);
    }
};
export const DeleteOrder =async (req: Request, res: Response,next : NextFunction) => {
    try {
        const u = await order.DeleteOrder(req.params.id as unknown as Number );
        res.json({
            msg: "done",
            data:{...u}
        });
    } catch (error) {
        next(error);
    }
};
export const addProduct = async (_req: Request, res: Response) => {
    const orderId: string = _req.params.id
    const productId: string = _req.body.product_id
    const quantity: number = parseInt(_req.body.quantity)
    try {
      const addedProduct = await order.addProduct(quantity, orderId, productId)
      res.json(addedProduct)
    } catch(err) {
      res.status(400)
      res.json(err)
    }
  } 




