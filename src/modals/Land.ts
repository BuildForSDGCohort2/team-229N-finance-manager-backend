import * as mongoose from 'mongoose';

const landSchema = new mongoose.Schema({
  id: {
    type: String,
    // unique: true,
    // required: true,
  },
  details: {
    type: String,
  },
  type: {
    type: String,
    // required: true,
    //   default:false
  },
  amount: {
    type: Number,
    // required: true,
  },
  code: {
    type: String,
  },
  sold: {
    type: Boolean,
    default: false,
  },
  pd: {
    type: Date,
    //   default: Date.now
  },
});

const Land = mongoose.model('Land', landSchema);

export default Land;
