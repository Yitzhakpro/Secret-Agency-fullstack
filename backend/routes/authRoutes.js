const { Router } = require('express');
const authController = require('../controllers/authController');


const router = Router();


router.get('/fetchUsers', authController.fetchUsers);
router.get('/getUser/:id', authController.getUser);
router.post('/setRank', authController.setRank);
router.get('/deleteUser/:id', authController.deleteUser);

router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.post('/logout', authController.logout_post);
router.get('/checkLogin', authController.checkLogin_get);


module.exports = router;