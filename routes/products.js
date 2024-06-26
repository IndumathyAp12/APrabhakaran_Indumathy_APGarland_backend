const { Router } = require('express');
const productController = require('../controllers/products.js');
const router = Router();

// CRUD operations
router.post('/', productController.createProduct);

router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProductById);

router.put('/:id', productController.updateProduct);

router.delete('/:id', productController.deleteProduct);


module.exports = router;