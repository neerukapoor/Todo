const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

router.get('/callback', (req, res, next) => {
    passport.authenticate( 'google', (err, user, info) => {
        if(err)
            return next(err);
        if(!user)
            return res.redirect('/auth/google/failure');
        return res.redirect('/todo?id=' + user.id);
    })(req, res, next);
});

router.get('/failure', (req, res) => {
    res.send("something went wrong");
})

router.get('/protected', (req, res) => {
    let name = req.user.displayName;
    res.send(`hello ${name}`);
})

module.exports = router;
