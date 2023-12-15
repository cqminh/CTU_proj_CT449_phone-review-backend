const express = require('express');
const router = express.Router();

const PhonesControllers = require('../controllers/accounts.controller')

router.post('/login', PhonesControllers.loginAccount)
router.get('/:id', PhonesControllers.getOneUser)
router.post('/', PhonesControllers.postUser)
router.put('/:id', PhonesControllers.putUser)
router.delete('/:id', PhonesControllers.deleteUser)

module.exports = router;