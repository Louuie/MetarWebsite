const dotenv = require('dotenv').config()
const axios = require('axios');
let metarInformation = { };
const getMetar = (req, res, next) => {
    const options = {
        url: `https://api.checkwx.com/metar/${req.query.icao}/decoded`,
        method: "GET",
        headers: { 'X-API-Key': process.env.checkwx_api_key}
    }
    axios(options)
    .then(function (response) {
        const locationResponse = response.data;
        metarInformation = locationResponse.data[0];
        req.metar = metarInformation;
        return next()
    })
    .catch(function (err) { console.log(err) })
};

module.exports = { getMetar }