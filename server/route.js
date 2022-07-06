const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/send/pw', controller.api.sendPw);

// router.get('/get/data', controller.api.getData);
// router.post('/add/data', controller.api.addData);
// router.post('/modify/data', controller.api.modifyData);
// router.post('/delete/data', controller.api.deleteData);

module.exports = router;
