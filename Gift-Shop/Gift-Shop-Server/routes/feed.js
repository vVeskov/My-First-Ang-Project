const router = require('express').Router();
const feedController = require('../controllers/feed');
// const isAuth = require('../middleware/is-auth');

router.get('/gifts', feedController.getGifts);
router.post('/gift/create', feedController.createGift);
router.get('/gift/details/:id',feedController.giftDetails)
router.put('/gift/edit/:id', feedController.editGift);
router.delete('/gift/delete/:id' ,feedController.deleteGift);
router.post('/user/newOrder', feedController.addNewOrderToUser)
router.get('/user/orders', feedController.getUserOrders);
router.post('/user/delete',feedController.removeUserOrders);
router.post('/user/deleteSingleGift',feedController.deleteSingleGift);
router.post('/user/addPendingOrders',feedController.addPendingOrders);
router.get('/user/getPendingOrders',feedController.getPendingOrders);
router.post('/user/deleteSingleOrder',feedController.deleteSingleOrder);

module.exports = router;