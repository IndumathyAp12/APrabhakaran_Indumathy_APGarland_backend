const { Schema, model } = require('../config/db-connection.js');

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [50, 'Username must be less than 50 characters long'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user' 
  }
});

// Indexes 
userSchema.index({ username: 1 });
userSchema.index({ email: 1 });

module.exports = model('User', userSchema);
