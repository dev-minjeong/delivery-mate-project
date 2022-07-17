const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/send/pw', controller.api.sendPw);

router.post('/add/board', controller.add.board);

router.get('/get/board', controller.get.board);

module.exports = router;
