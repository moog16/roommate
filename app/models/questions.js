var mongoose = require('mongoose'),
  config = require('../../config/config'),
  Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true
  },
  content: {
    type: String,
    default: '',
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
QuestionSchema.path('title').validate(function(title) {
  return title.length;
}, 'Title cannot be blank');

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