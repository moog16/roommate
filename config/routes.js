var async = require('async'),
    api   = require('../app/controllers/api.js');
    https = require('https');

module.exports = function(app, passport, auth) {
  //User Routes
  var users = require('../app/controllers/users.js');
  app.get('/signin', users.signin);
  app.get('/signup', users.signup);
  app.get('/signout', users.signout);

  //Setting up the users api
  app.post('/users', users.create);
  
  app.post('/users/session', passport.authenticate('local', {
    failureRedirect: '/signin',
    failureFlash: 'Invalid email or password.'
  }), users.session);

  app.get('/users/me', users.me);
  app.get('/users/:userId', users.show);

  app.get('/friends',passport.authenticate('facebook', {
    scope: ['email', 'user_about_me'],
    failureRedirect: '/signin'
  }), api.api);
  
  //Setting the facebook oauth routes
  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['email', 'user_about_me'],
    failureRedirect: '/signin'
  }), users.signin);

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/signin'
  }), users.authCallback);

  //Finish with setting up the userId param
  app.param('userId', users.user);

  //Article Routes
  var articles = require('../app/controllers/articles');
  app.get('/articles', articles.all);
  app.post('/articles', auth.requiresLogin, articles.create);
  app.get('/articles/:articleId', articles.show);
  app.put('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.update);
  app.del('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.destroy);

  //Finish with setting up the articleId param
  app.param('articleId', articles.article);

  //Home route
  var index = require('../app/controllers/index');
  app.get('/', index.render);

};