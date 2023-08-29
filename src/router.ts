import { Router } from 'express';
import { body, oneOf } from 'express-validator';
import { handleInputErrors } from './middleware';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from './handlers/product';
import { createUpdate, deleteUpdate, getUpdate, getUpdates, updateUpdate } from './handlers/updates';


const router = Router();

router.get('/product', getProducts);
router.get('/product/:id', getProduct);
router.post('/product', body('name').isString(), handleInputErrors, createProduct);
router.put('/product/:id', body('name').isString(), handleInputErrors, updateProduct);
router.delete('/product/:id', body('id'), handleInputErrors, deleteProduct);

router.get('/update', getUpdates);
router.get('/update/:id', getUpdate);
router.post('/update', 
    body(['title', 'body', 'productId']).exists().isString(), 
    handleInputErrors, createUpdate);
router.put('/update/:id', 
    body(['title', 'body', 'version']).optional(), 
    body('status')
        .isIn(['IN_PROGRESS', 'ARCHIVED', 'DEPRECATED', 'LIVE'])
        .optional(), 
    handleInputErrors, updateUpdate);
router.delete('/update/:id', deleteUpdate);

router.get('/updatepoint', (req, res) => {});

router.get('/updatepoint/:id', (req, res) => {});

router.post('/updatepoint', body(['name', 'description']).isString(), body(['updateId']).exists().isString(), handleInputErrors, (req, res, next) => {
    
});

router.put('/updatepoint/:id', body(['name', 'description']).optional().isString(), handleInputErrors, (req, res, next) => {
});

router.delete('/updatepoint/:id', (req, res) => {});

export default router;
