var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  https = require('https'),
  fields =  ['id,',
          'name,',
          'interests.fields(name,id),',
          //'age_range,',
          //'about,',
          //'bio,',
          // 'education,',
          // 'favorite_athletes,',
          // 'favorite_teams,',
          // 'hometown,',
          // 'gender,',
          // 'birthday,',
          // 'books.fields(name,id,link,picture.type(large)),',
          // 'relationship_status,',
          'friends.fields(name,id,link,picture.type(large)),',
          // 'quotes,',
          // 'languages,',
          // 'inspirational_people,',
          // 'sports,',
          'music.fields(name,id,link,picture.type(large)),',
          'movies.fields(name,id,link,picture.type(large)),',
          // 'devices,',
          'link,',
          'work,',
          'posts,',
          // 'photos,',
          // 'albums,',
          // 'location,',
          // 'events.fields(name,picture.type(large)),',
          // 'cover,',
          // 'religion,',
          // 'sports,',
          'picture.type(large)'];
  
exports.user = function(accessToken, refreshToken, profile, done) {
  var options = {
    hostname: 'graph.facebook.com',
    port: 443,
    path: '/me?fields=' + fields.join('') + '&access_token=' + accessToken,
    method: 'GET'
  };
  User.findOne({
    'facebook.id': profile.id
  }, function(err, user) {
    if (err) {
      return done(err);
    } else {
      if (!user) {
        var userProfile = profile._json;
        userProfile.accessToken = accessToken;
        userProfile.refreshToken = refreshToken;
        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          username: profile.username,
          provider: 'facebook',
          facebook: userProfile,
          questions: []
        });
      }


      var FBreq = https.request(options, function(FBres) {
        var FBresults = '';

        FBres.on('data', function(d) {
          FBresults += d.toString();
        });

        FBres.on('end', function() {
          if(err) {
            console.log(err);
          } else {
            FBresults = JSON.parse(FBresults);
            var keys = Object.keys(FBresults);
            for(var key in keys) {
              user.facebook[keys[key]] = FBresults[keys[key]];
            }
            user.save(function(err) {
              if (err) console.log(err);
            });
            return done(err, user);
          }
        });
      });

      FBreq.end();
    }
  });
};