const { Router } = require('express');
const wantedController = require('../controllers/wantedController');


const router = Router();

router.get('/fetchWanteds', wantedController.fetchWanteds);
router.post('/addWanted', wantedController.addWanted);
router.delete('/deleteWanted', wantedController.deleteWanted);


module.exports = router