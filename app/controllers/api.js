var  https = require('https'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  fields =  ['id,',
            'name,',
            'interests.fields(name,id),',
            'age_range,',
            'about,',
            'bio,',
            'education,',
            'favorite_athletes,',
            'favorite_teams,',
            'hometown,',
            'gender,',
            'birthday,',
            'books,',
            'relationship_status,',
            'quotes,',
            'languages,',
            'inspirational_people,',
            'sports,',
            'music.fields(name,id),',
            'movies.fields(name,id),',
            'devices,',
            'work,',
            'posts,',
            'photos,',
            'albums,',
            'location'];

exports.api = function(accessToken, refreshToken, profile, done) {
  // var access_token = req.user.facebook.accessToken;
  var options = {
    hostname: 'graph.facebook.com',
    port: 443,
    path: '/me?fields=' + fields.join('') + '&access_token=' + accessToken,
    method: 'GET'
  };

  var FBreq = https.request(options, function(FBres) {
    var FBresults = '';

    FBres.on('data', function(d) {
      FBresults += d.toString();
    });

    FBres.on('end', function() {
      User.findOne({
        'facebook.id': profile.id
      }, function(err, user) {
        if(err) {
          throw err;
        } else {
          FBresults = JSON.parse(FBresults);
          var keys = Object.keys(FBresults);
          for(key in keys) {
            console.log(keys[key]);
            user.facebook[keys[key]] = FBresults[keys[key]];
            // console.log(keys[key], ': \n',user.facebook[keys[key]]);
          }
          user.save(function(err) {
            if(err) throw err;
          })
        }
      })
    });
  });

  FBreq.end();
};