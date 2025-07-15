import { Router } from "express";
import * as contactUsController from "./contactUsController.js";
import { 
   contactValidator,
} from "./contactUsValidations.js";
import { validation } from "../../middlewares/validation.js";
import { protect, adminRoute } from "../../middlewares/auth.js";

const router = Router();

// Create contact form submission (Public)
router.post('/submitContactForm', 
   validation({ body: contactValidator }), 
   contactUsController.createContact
);

// Get all contact submissions (Admin only)
router.get('/getAllContactSubmissions', 
   protect,
   adminRoute,
   validation({ params: contactValidator }), 
   contactUsController.getAllContact
);

// Get single contact submission (Admin only)
router.get('/getContactSubmission/:id', 
   protect,
   adminRoute,
   validation({ params: contactValidator }), 
   contactUsController.getContact
);

// Delete contact submission (Admin only)
router.delete('/deleteContactSubmission/:id', 
   protect,
   adminRoute,
   validation({ params: contactValidator }), 
   contactUsController.deleteContact
);

// Mark contact submission as read (Admin only)
router.patch('/markAsRead/:id', 
   protect,
   adminRoute,
   validation({ params: contactValidator }), 
   contactUsController.markAsRead
);

// Get unread contact submissions count (Admin only)
router.get('/getUnreadCount', 
   protect,
   adminRoute,
   contactUsController.getUnreadCount
);

export default router; 