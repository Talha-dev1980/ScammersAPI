const scammers_controller = require('../controllers/scammers_controller')
var express = require('express');
var router = express.Router();

router.get('/p', scammers_controller.getPaginated)

router.get('/', scammers_controller.getScammers)
router.get('/q/:value', scammers_controller.searchScammer)
//router.get('/q/:value/paginate/q', scammers_controller.searchScammer)
router.get('/:id', scammers_controller.getScammerById);
router.get('/num/:number', scammers_controller.getScammerByNumber);
router.post('/', scammers_controller.addScammer)
//router.put('/:id', scammers_controller.putShipping)
router.delete('/:id', scammers_controller.deleteScammer);

module.exports = router;
