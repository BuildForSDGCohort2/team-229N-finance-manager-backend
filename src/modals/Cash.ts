import * as mongoose from 'mongoose';

const cashSchema = new mongoose.Schema({
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
  pd: {
    type: Date,
    //   default: Date.now
  },
});

const Cash = mongoose.model('Cash', cashSchema);

export default Cash;
