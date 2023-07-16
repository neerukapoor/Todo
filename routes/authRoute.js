const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

router.get('/callback',
    passport.authenticate( 'google', {
        successRedirect: '/todo',
        failureRedirect: '/auth/google/failure'
}));

router.get('/failure', (req, res) => {
    res.send("something went wrong");
})

router.get('/protected', (req, res) => {
    let name = req.user.displayName;
    res.send(`hello ${name}`);
})

module.exports = router;
