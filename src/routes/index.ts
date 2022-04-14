import { Router } from "express";
import usersRoutes from "./api/users.routes"
import productRoutes from "./api/product.routes"
import orderRoutes from "./api/order.routes";
import dashboard from "./api/dashboard.routes"

const routes = Router();

routes.use('/users',usersRoutes);
routes.use ('/products',productRoutes);
routes.use ('/orders',orderRoutes);
routes.use ('/dashboard',dashboard);


export default routes;