import * as mongoose from 'mongoose';

const cashBookSchema = new mongoose.Schema({
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
  cash: {
    type: Number,
    // required: true,
  },
  bank: {
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

const Cashbook = mongoose.model('Cashbook', cashBookSchema);

export default Cashbook;
