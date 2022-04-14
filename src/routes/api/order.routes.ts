import { Router} from "express";
import * as controllers from "../../controllers/order.controller"
import verifyToken from "../../middlewares/verifyAuthJWT";

const routes = Router();
//CRUD endpoints for ORDER model
routes.route('/').get(controllers.getAllOrders).post(verifyToken,controllers.createOrder);
routes.route('/:id')
.get(controllers.getOneOrder)
.patch(verifyToken,controllers.UpdateOrder)
.delete(verifyToken,controllers.DeleteOrder);
 // add product
 routes.route('/:id/products').post(controllers.addProduct);

export default routes;