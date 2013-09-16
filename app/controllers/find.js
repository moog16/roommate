
exports.roommates = function(req, res) {
  //find users based on req.user query params
  console.log(typeof req.user);
  var artists = req.user.facebook.music.data;
  var artistID = [];
  for(var artist=0; artist<artists.length; artist++) {
    artistID.push(artists[artist].id)
  }
  // User.find({

  // })
  //insert them into array
  //send to user
  // User.find()
  res.redirect('/');
};