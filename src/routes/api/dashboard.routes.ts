import { Router} from "express";
import * as controllers from "../../controllers/dashboard.controller"
import verifyToken from "../../middlewares/verifyAuthJWT";

const routes = Router();
//dashboard endpoints
routes.route('/products-in-orders').get(controllers.productsInOrders);
routes.route('/users-with-orders').get(verifyToken,controllers.usersWithOrders);
routes.route('/five-most-expensive').get(controllers.fiveMostExpensive)


export default routes;