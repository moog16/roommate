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

exports.api = function(req, res) {
  var access_token = req.user.facebook.accessToken;
  var options = {
    hostname: 'graph.facebook.com',
    port: 443,
    path: '/me?fields=' + fields.join('') + '&access_token=' + access_token,
    method: 'GET'
  };

  var FBreq = https.request(options, function(FBres) {
    console.log('hello');
    // console.log("statusCode: ", FBres.statusCode);
    // console.log("headers: ", FBres.headers);
    // console.log('');

    var FBresults = '';

    FBres.on('data', function(d) {
      FBresults += d.toString();
    });

    FBres.on('end', function() {
      // User.findOne({
      //   'facebook.id': req.user.facebook.id
      // }, function(err, user) {
      //   if(err) {
      //     throw err;
      //   } else {
      //     var keys = Object.keys(FBresults);
      //     for(key in keys) {
      //       user.facebook[key] = FBresults[key];
      //     }
      //   }
      // })
      res.send(FBresults);
    });
  });

  FBreq.end();
};