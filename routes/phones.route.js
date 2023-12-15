const express = require('express');
const router = express.Router();

const PhonesControllers = require('../controllers/phones.controller')

router.get('/', PhonesControllers.getAllPhones)
router.get('/favorite', PhonesControllers.getFavoritePhones)
router.get('/:id', PhonesControllers.getOnePhones)
router.get('/account/:accountID', PhonesControllers.getOwnPhones)
router.post('/', PhonesControllers.postPhones)
router.put('/:id', PhonesControllers.putPhones)
router.delete('/:id', PhonesControllers.deletePhones)

module.exports = router;