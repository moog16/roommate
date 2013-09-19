var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  https = require('https'),
  fields =  ['id,',
          'name,',
          'interests.fields(name,id),',
          'age_range,',
          'about,',
          'email,',
          'bio,',
          'education,',
          'favorite_athletes,',
          'favorite_teams,',
          'hometown,',
          'gender,',
          'birthday,',
          'books.fields(name,id,link,picture.type(large)),',
          'relationship_status,',
          'quotes,',
          'languages,',
          'friends.fields(name,id,picture.type(large)),',
          'inspirational_people,',
          'sports,',
          'music.fields(name,id,link,picture.type(large)),',
          'movies.fields(name,id,link,picture.type(large)),',
          'devices,',
          'work,',
          'posts,',
          'photos,',
          'albums,',
          'location,',
          'events.fields(name,picture.type(large)),',
          'cover,',
          'religion,',
          'sports,',
          'picture.type(large)'];
  
module.exports = function() {
  var accessToken = 'CAAIZBU6hZCOOUBAKMEtUHk4zZCu0WDUEDdZCBZCVew85UXqZAdOhSEZAh4GsaTSzUEnySJwiQz4LM2z7psRSZAyPxTAllmMrD6bUYY7vliyW7RoxjlKCiTUQZAjCxm5K2Iw5iCh6xg4Ke0uAhVVIT0UykfZByCKeEDGOVm6t7MrDgoHyNowqLDIcFijzUJUasVJJgxjuDUrZA3SUwZDZD';
  var id = '100006715684638';
  var options = {
    hostname: 'graph.facebook.com',
    port: 443,
    path: '/'+id+'?fields=' + fields.join('') + '&access_token=' + accessToken,
    method: 'GET'
  };
  User.findOne({
    'facebook.id': id
  }, function(err, user) {
    if (err) {
      return done(err);
    } else {
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
            user = new User({
              name: FBres.name,
              email: FBres.email,
              provider: 'facebook',
              facebook: {}
            });

            user.facebook['accessToken'] = accessToken;
            var keys = Object.keys(FBresults);
            for(key in keys) {
              console.log(keys[key]);
              user.facebook[keys[key]] = FBresults[keys[key]];
            }
            user.save(function(err) {
              if (err) console.log(err);
            });
            console.log(FBresults);
          }
        });
      });

      FBreq.end();
    }
  });
};