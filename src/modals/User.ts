import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  // googleId: {
  //   type: String || null,
  //   default: null,
  //   // unique: true,
  //   //   required: true,
  // },
  email: {
    type: String,
    unique: true,
    // required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  // activated: {
  //   type: Boolean,
  //   default: false,
  // },
  lastLogin: {
    type: Date || null,
    default: null,
  },
  pd: {
    type: Date,
    //   default: Date.now,
  },
});

const User = mongoose.model('User', UserSchema);

export default User;
