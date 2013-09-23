var mongoose = require('mongoose'),
  User = mongoose.model('User');

/**
 * Show login form
 */
// exports.signin = function(req, res) {
//   res.render('users/auth', {
//     title: 'Signin',
//     message: req.flash('errrror')
//   });
// };

// *
//  * Show sign up form
 
// exports.signup = function(req, res) {
//   res.render('users/signup', {
//     title: 'Sign up',
//     user: new User()
//   });
// };

/**
 * Logout
 */
exports.signout = function(req, res) {
  req.logout();
  res.redirect('/');
};

/**
 * Session
 */
exports.session = function(req, res) {
  res.redirect('/#!/roommates');
};

/**
 * Create user
 */
exports.create = function(req, res) {
  var user = new User(req.body);

  user.provider = 'local';
  user.save(function(err) {
    if (err) {
      return res.render('users/signup', {
        errors: err.errors,
        user: user
      });
    }
    req.logIn(user, function(err) {
      if (err) return next(err);
      return res.redirect('/');
    });
  });
};

/**
 *  Show profile
 */
exports.show = function(req, res) {
  var user = req.profile;

  res.render('users/show', {
    title: user.name,
    user: user
  });
};

/**
 * Send User
 */
exports.me = function(req, res) {
  console.log(req);
  res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
  User
    .findOne({
        _id: id
    })
    .exec(function(err, user) {
      if (err) return next(err);
      if (!user) return next(new Error('Failed to load User ' + id));
      req.profile = user;
      next();
  });
};