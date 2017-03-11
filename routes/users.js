var express = require('express');
var router = express.Router();

let Account = require('../models/account');

// auth check
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // user is logged, so call the next function
    }

    res.redirect('/'); // not logged in so redirect to home
}

/* GET users listing. */
router.get('/', isLoggedIn, function (req, res, next) {

    Account.find(function (err, accounts) {

        if (err) {
            console.log(err);
            res.end(err);
            return;
        }
        // no error so send the account to the users view
        console.log(accounts);
        res.render('users', {
            title: 'Accounts',
            accounts: accounts,
            user: req.user

        });

    });
});

module.exports = router;
