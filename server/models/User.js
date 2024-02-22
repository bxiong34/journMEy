const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    validate : {
      validator : function(value) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
      },
      message: props => `${props.value} is not a valid email`
    }
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  reviews: [
    { 
    type: Schema.Types.ObjectId,
    ref: 'Review' 
    }
  ],
});

const User = model('User', userSchema);

module.exports = User;