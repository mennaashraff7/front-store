import { Router} from "express";
import * as controllers from "../../controllers/user.controller"
import verifyToken from "../../middlewares/verifyAuthJWT";

const routes = Router();
//CRUD endpoints for user model
routes.route('/').get(verifyToken,controllers.getAllUsers).post(controllers.create);
routes.route('/:id')
.get(verifyToken,controllers.getOneUser)
.patch(verifyToken,controllers.UpdateUser)
.delete(verifyToken,controllers.DeleteUser);

export default routes;