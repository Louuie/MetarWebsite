const express = require('express');
const router = express.Router();
const passport = require('passport');
const googleAuth = require("../middleware/auth/auth");



router.get('/user/information', googleAuth.isValid, (req, res) => {
    let userInformation = {
        fullName: req.fullName,
        email: req.email,
        profile_picture: req.picture,
        user_id: req.user_id,
    }
    res.json(userInformation);
})

router.get('/status', googleAuth.isValid, (req, res) => {
    res.json({isAuthenticated: true});
});



module.exports = router;