import Joi from "joi";

//==================================Order Validation Schemas======================================

export const orderIdValidator = Joi.object({
   id: Joi.string().required().hex().length(24).messages({
      'string.hex': 'Invalid order ID format',
      'string.length': 'Order ID must be exactly 24 characters'
   })
});

export const updateOrderStatusValidator = Joi.object({
   status: Joi.string().required().valid('pending', 'processing', 'shipped', 'delivered', 'cancelled')
});

export const orderQueryValidator = Joi.object({
   page: Joi.number().optional().min(1).default(1),
   limit: Joi.number().optional().min(1).max(50).default(10),
   status: Joi.string().optional().valid('pending', 'processing', 'shipped', 'delivered', 'cancelled')
}); 