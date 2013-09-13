var async = require('async'),
  https = require('https'),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

exports.api = function(req, res) {
  var token = req.user.facebook.accessToken;
  var fields =  ['id,',
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

  var options = {
    hostname: 'graph.facebook.com',
    port: 443,
    path: '/me?fields=' + fields.join('') + '&access_token=' + token,
    method: 'GET'
  };


  var req = https.request(options, function(FBres) {
    console.log("statusCode: ", FBres.statusCode);
    console.log("headers: ", FBres.headers);
    console.log('');

    var FBresults = '';

    FBres.on('data', function(d) {
      // var FBresults = JSON.parse(d.toString());
      FBresults = FBresults + d.toString();
      // res.jsonp(JSON.parse(d.toString()));
    });

    FBres.on('end', function() {
      // var FBdata = JSON.parse(FBresults);
      // console.log(JSON.parse(FBresults));
      res.send(FBresults);
    });     
  });

  req.end();
};