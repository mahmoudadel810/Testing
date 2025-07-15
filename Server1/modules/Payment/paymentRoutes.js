import { Router } from "express";
import * as paymentController from "./paymentController.js";
import { 
   createCheckoutSessionValidator,
   checkoutSuccessValidator 
} from "./paymentValidations.js";
import { validation } from "../../middlewares/validation.js";
import { protect } from "../../middlewares/auth.js";

const router = Router();

// All payment routes are protected
router.use(protect);

// Create checkout session
router.post('/createCheckoutSession', 
   validation({ body: createCheckoutSessionValidator }), 
   paymentController.createCheckoutSession
);

// Checkout success
router.post('/checkoutSuccess', 
   validation({ body: checkoutSuccessValidator }), 
   paymentController.checkoutSuccess
);

export default router; 