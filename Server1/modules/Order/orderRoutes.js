import { Router } from "express";
import * as orderController from "./orderController.js";
import { 
   orderIdValidator,
   updateOrderStatusValidator,
   orderQueryValidator 
} from "./orderValidations.js";
import { validation } from "../../middlewares/validation.js";
import { protect, adminRoute } from "../../middlewares/auth.js";

const router = Router();

// All order routes are protected
router.use(protect);

// Get user's orders
router.get('/getUserOrders', 
   orderController.getUserOrders
);

// Get order by ID
router.get('/getOrder/:id', 
   validation({ params: orderIdValidator }), 
   orderController.getOrderById
);

// Admin routes
router.get('/getAllOrders', 
   adminRoute,
   validation({ query: orderQueryValidator }), 
   orderController.getAllOrders
);

router.put('/updateOrderStatus/:id', 
   adminRoute,
   validation({ params: orderIdValidator, body: updateOrderStatusValidator }), 
   orderController.updateOrderStatus
);

router.delete('/deleteOrder/:id', 
   adminRoute,
   validation({ params: orderIdValidator }), 
   orderController.deleteOrder
);

export default router; 