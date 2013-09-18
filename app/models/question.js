var mongoose = require('mongoose'),
  config = require('../../config/config'),
  Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  question: {
    type: String,
    default: '',
    trim: true
  },
  answers: {
    type: Array,
    default: ['Yes', 'No'],
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Validations
 */
QuestionSchema.path('question').validate(function(question) {
  return question.length;
}, 'Question cannot be blank');

/**
 * Statics
 */
QuestionSchema.statics = {
  load: function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user').exec(cb);
  }
};

mongoose.model('Question', QuestionSchema);