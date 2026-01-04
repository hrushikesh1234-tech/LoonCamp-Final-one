const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.get('/public-list', propertyController.getPublicProperties);
router.get('/public/:slug', propertyController.getPublicPropertyBySlug);

// Protected routes (require authentication)
router.get('/list', authMiddleware, propertyController.getAllProperties);
router.get('/:id', authMiddleware, propertyController.getPropertyById);
router.post('/create', authMiddleware, propertyController.createProperty);
router.put('/update/:id', authMiddleware, propertyController.updateProperty);
router.delete('/delete/:id', authMiddleware, propertyController.deleteProperty);
router.patch('/toggle-status/:id', authMiddleware, propertyController.togglePropertyStatus);

module.exports = router;
