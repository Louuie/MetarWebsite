const dotenv = require('dotenv').config()
const axios = require('axios');
let metarInformation = { };
const authFailure = { error: {
    code: 401,
    status: "Authentication Failure,"    
} };
const getMetar = (req, res, next) => {
    if(req.isAuthenticated()) {
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
    } else { res.redirect("http://localhost:3000/login") }
};

module.exports = { getMetar }