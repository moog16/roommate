var  mongoose = require('mongoose'),
  User = mongoose.model('User');

exports.info = function(req, res) {
  User.findOne({
    'facebook.id' : req.user.facebook.id
  }, function(err, user) {
    if(err) {
      throw err;
    } else if(!user) {
      res.redirect('/signup');
    } else {
      res.send(user.facebook);
    }
  });
};

// TODO: update if the date is old
// var ISODateString = function(d){
//   var pad = function(n){
//     return n<10 ? '0'+n : n;
//   };
//   return d.getUTCFullYear()+'-' + pad(d.getUTCMonth()+1)+'-'+ pad(d.getUTCDate())+'T'+ pad(d.getUTCHours())+':'+ pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds())+'Z';
// };