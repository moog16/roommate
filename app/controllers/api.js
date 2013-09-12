var async = require('async'),
  https = require('https');

exports.api = function(req, res) {
  console.log(req.user.id);
  

  var options = {
    hostname: 'graph.facebook.com',
    port: 443,
    path: '/1043010258?fields=id,name',
    // path: '/me?fields=id,name,friends.fields(name)?access_token=',
    method: 'GET'
  };

  var req = https.request(options, function(FBres) {
    console.log("statusCode: ", FBres.statusCode);
    console.log("headers: ", FBres.headers);
    console.log('');

    FBres.on('data', function(d) {
      // process.stdout.write(d);
      console.log(d.toString());
      res.jsonp(d.toString());
    });
  });

  req.end();

  //res.jsonp(req || null);
};