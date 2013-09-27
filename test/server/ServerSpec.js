var handler = require("../../config/routes.js");

function StubRequest(url, method, postdata) {
  this.url = url;
  this.method = method;
  this._postData = postdata;
  this.setEncoding = function(type) {
    //ignore
  };
  var self = this;
  this.addListener = this.on = function(type, callback) {
    if (type == "data") {
      callback(JSON.stringify(self._postData));
    }
    if (type == "end") {
      callback();
    }
  };
}

function StubResponse() {
  this._ended = false;
  this._responseCode = null;
  this._headers = null;
  this._data = null;
  var self = this;
  this.writeHead = function(responseCode, headers) {
    console.log("WriteHead called with " + responseCode);
    self._responseCode = responseCode;
    self._headers = headers;
  };
  this.end = function(data) {
    console.log("Response.end called.");
    self._ended = true;
    self._data = data;
  };
}

describe("Node Server Request Listener Function", function() {
 it("Should answer GET requests for /classes/room", function() {
   var req = new StubRequest("http://127.0.0.1:8080/1/classes/room1",
                             "GET");
   var res = new StubResponse();

   handler.handleRequest(req, res);
   setTimeout(function() {
     expect(res._responseCode).toEqual(200);
     expect(res._data).toEqual("[]");
     expect(res._ended).toEqual(true);
   }, 500);
 });
/*
 it("Should accept posts to /classes/room", function() {
   var req = new StubRequest("http://127.0.0.1:8080/1/classes/room1",
                             "POST",
                            {username: "Jono",
                             message: "Do my bidding!"});
   var res = new StubResponse();

   handler.handleRequest(req, res);

   // Expect 201 Created response status
   expect(res._responseCode).toEqual(201);

   // Testing for a newline isn't a valid test
   // todo: Replace with with a valid test
   // expect(res._data).toEqual(JSON.stringify("\n"));
   setTimeout( function() {
     expect(res._ended).toEqual(true);
   }, 500);

   // Now if we request the log for that room,
   // the message we posted should be there:
   req = new StubRequest("http://127.0.0.1:8080/1/classes/room1",
                             "GET");
   res = new StubResponse();

   handler.handleRequest(req, res);

   setTimeout( function() {
     expect(res._responseCode).toEqual(200);
     var messageLog = JSON.parse(res._data);
     expect(messageLog.length).toEqual(1);
     expect(messageLog[0].username).toEqual("Jono");
     expect(messageLog[0].message).toEqual("Do my bidding!");
     expect(res._ended).toEqual(true);
   }, 500);
 });


 it("Should 404 when asked for a nonexistent file", function() {
   var req = new StubRequest("http://127.0.0.1:8080/arglebargle",
                             "GET");
   var res = new StubResponse();

   handler.handleRequest(req, res);
   console.log("Res is " + res);

   // Wait some time before checking results:
   waits(1000);

   runs(function() {
     expect(res._responseCode).toEqual(404);
     expect(res._ended).toEqual(true);
   });
 });
*/

});