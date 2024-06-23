const { Router } = require('express');
const orderController = require('../controllers/orders.js');
const router = Router();

router.post('/', orderController.createOrder);

router.get('/', orderController.getAllOrders);

router.get('/:id', orderController.getOrderById);

router.put('/:id', orderController.updateOrder);

router.delete('/:id', orderController.deleteOrder);

module.exports = router;