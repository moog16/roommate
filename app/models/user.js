var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto'),
    _ = require('underscore'),
    authTypes = ['facebook'];

var UserQuestionSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId, ref: 'Question'
  },
  answer: Number,
  accepts: [Number],
  importance: Number
});

var UserSchema = new Schema({
  name: String,
  email: String,
  username: String,
  provider: String,
  facebook: {},
  questions: [UserQuestionSchema],
  roommatesSeen: [String],
  roommatesFavorite: [String],
  preferences: {
    location: {}, //geolocation data, will determine what search results bring back
    budget: [Number], //how much are you willing to spend
    dwellingType: {}, //apartment/house/etc
    durationStay: [Number]  //days
  }
});

mongoose.model('User', UserSchema);