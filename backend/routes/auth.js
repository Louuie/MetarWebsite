const express = require('express');
const router = express.Router();
const passport = require('passport');
const googleAuth = require("../middleware/auth/auth");


router.get('/google', googleAuth.prepareAuthorization, passport.authenticate('google', { scope: ['profile', 'email'] }));


router.get('/google/callback', passport.authenticate('google', {
    successRedirect: "http://localhost:4000/auth/status",
    failureRedirect: "http://localhost:4000/auth/google/failure"
}));

router.get('failure', (req, res) => res.send("Something went wrong try again!"))

router.get('/user/information', googleAuth.isAuthenticated, (req, res) => {
    let user = {
        id: req.user.id,
        displayName: req.user.displayName,
        name: {familyName: req.user.name.familyName, givenName: req.user.name.givenName},
        emails: {main: req.user.emails[0].value, verified: req.user.emails[0].verified},
        profile_picture: {value: req.user.photos[0].value}
    };
    res.json(user);
})

router.get('/status', googleAuth.isAuthenticated, (req, res) => {
    res.json({isAuthenticated: true});
});



module.exports = router;