const router = require('express').Router();
const dvdsController = require('../controllers/dvds');

router.post('/rent', dvdsController.postRentDvd);
router.post('/return', dvdsController.postReturnDvd);
router.get('/', dvdsController.getDvds);

module.exports = router;