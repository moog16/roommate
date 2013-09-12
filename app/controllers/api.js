var async = require('async'),
    https = require('https');

exports.api = function(req, res) {
  // console.log(req);
  var options = {
    hostname: 'graph.facebook.com',
    port: 443,
    path: '/me?fields=id,name,friends.fields(name)',
    method: 'GET'
  };
  console.log('helo');
  var req = https.request(options, function(FBres) {
    console.log("statusCode: ", FBres.statusCode);
    console.log("headers: ", FBres.headers);

    FBres.on('data', function(d) {
      // process.stdout.write(d);
      console.log(d.toString());
    });
  });

  req.end();

  req.on('error', function(e) {
    console.error(e);
  });
  res.jsonp(req || null);
};