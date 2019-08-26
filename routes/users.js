const router = require('express').Router();
const userController = require('../controllers/users');

router.post('/', userController.postRegisterUser);
router.get('/', userController.getLoginUser);

module.exports = router;