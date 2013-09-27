var expect = require('expect.js'),
  request = require('request'),
  spawn = require('child_process').spawn,
  server = spawn('node', ['../../server.js']);

describe('server', function () {
  before(function () {
    // server();
  });

  describe('/', function () {
    it('should return 200', function (done) {
      request('http://goom.com:3000', function (error, res, body) {
        expect(res).to.exist;
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  // describe('/api/userInfo', function () {
  //   it('should return 200', function (done) {
  //     request('http://goom.com:3000/api/userInfo', function (error, res, body) {
  //       expect(res).to.exist;
  //       expect(res.statusCode).to.equal(200);
  //       done();
  //     });
  //   });
  // });

// app.post('/users', users.create);


//   app.get('/users/me', users.me);
//   app.get('/users/:userId', users.show);

//   // api interface routes
//   app.get('/api/userInfo', getUser.info);
//   app.get('/api/getQuestions/unanswered', getQuestions.andAnswers);
//   app.post('/api/getQuestions/fromUser', getQuestions.fromUser);
//   app.get('/api/getRoommate', getRoommate.info);

//   app.post('/api/setUserQA', setUserQA);
//   app.post('/api/setUserRoommates', setuserRoommates);
//   app.post('/api/setUserPref', setUserPref);
//   app.post('/api/userArray', getUser.userArray);


  after(function () {
    // server.close();
  });
});

