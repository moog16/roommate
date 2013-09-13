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
  
  // app.post('/users/session', passport.authenticate('local', {
  //   failureRedirect: '/signin',
  //   failureFlash: 'Invalid email or password.'
  // }), users.session);

  app.get('/users/me', users.me);
  app.get('/users/:userId', users.show);

  app.get('/api/friends', api.api);

  //Setting the facebook oauth routes
  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['email', 'user_about_me', 'user_relationship_details', 'user_status', 'user_website', 'user_groups',
            'user_photos', 'user_relationships', 'user_work_history', 'user_hometown', 'user_friends',
            'user_activities', 'user_education_history', 'user_groups', 'user_religion_politics', 'user_events',
            'friends_about_me', 'friends_activities', 'friends_birthday', 'friends_group', 'friends_interests',
            'friends_relationships', 'friends_work_history', 'friends_events', 'user_actions.books',
            'user_actions.video', 'user_actions_music', 'friends_actions.news', 'friends_education_history',
            'friends_religion_politics', 'friends_subscriptions', 'friends_status', 'friends_hometown',
            'friends_photos', 'friends_website', 'user_videos', 'friends_videos', 'user_questions',
            'friends_questions', 'user_birthday', 'user_location', 'friends_location', 'user_games_activity',
            'friends_online_presence', 'user_notes', 'publish_actions', 'user_subscriptions', 'user_likes',
            'friends_likes'],
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