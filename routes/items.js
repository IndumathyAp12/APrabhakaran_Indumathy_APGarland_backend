const { Router } = require('express');
const itemController = require('../controllers/items.js');
const router = Router();

router.post('/', itemController.createItem);

router.get('/', itemController.getAllItems);

router.get('/:id', itemController.getItemById);

router.put('/:id', itemController.updateItem);

router.delete('/:id', itemController.deleteItem);


module.exports = router;