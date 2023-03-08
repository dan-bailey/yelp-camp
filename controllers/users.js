const User = require('../models/user');
const session = require('express-session');


module.exports.renderLoginPage = (req, res) => {
    res.render('users/login');
};

module.exports.renderRegisterPage = (req, res) => {
    res.render('users/register');
};

module.exports.createNewUser = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
};

module.exports.logoutUser = function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('Logged out.');
      res.redirect('/campgrounds');
    });
};

module.exports.authenticateUser = (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};


