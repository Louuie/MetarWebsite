const express = require('express');
const router = express.Router();
const icao = require('../metar/fetchmetar')

router.get('/', icao.getMetar, (req, res) => {
    res.json(req.metar);
});



module.exports = router