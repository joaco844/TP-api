import { Router } from "express";
import { signup, signin, profile} from "./routes/auth.controller"
import { TokenValidation } from "./libs/validateToken";
const router: Router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', TokenValidation,profile);


export default router