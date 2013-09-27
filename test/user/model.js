var should = require('should'),
  app = require('../../server'),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

//Globals
var user;

//The tests
describe('<Unit Test>', function() {
  describe('Model User:', function() {
    before(function(done) {
      user = new User({
        name: 'Full Name',
        email: 'test@email.com',
        username: 'somebody.someting',
        provider: 'facebook',
        facebook: {},
        questions: [{
          questionId: '523922ec60e767269c000001',
          answer: 3,
          accepts: [1,2,3],
          importance: 2
        }],
        roommatesSeen: [],
        roommatesFavorite: [],
        preferences: {
          location: {}, //geolocation data, will determine what search results bring back
          budget: [500,800], //how much are you willing to spend
          dwellingType: {}, //apartment/house/etc
          durationStay: [3,24]  //days
        }
      });

      done();
    });

    describe('Method Save', function() {
      it('should be able to save whithout problems', function(done) {
        return user.save(function(err) {
          should.not.exist(err);
          done();
        });
      });
    });

    after(function(done) {
      User.findOneAndRemove({
        name: 'Full Name' 
      }, function(err, user) {
        if(err) throw err;
      });
      done();
    });
  });
});