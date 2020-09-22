import * as mongoose from 'mongoose';

const capitalSchema = new mongoose.Schema({
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

const Capital = mongoose.model('Capital', capitalSchema);

export default Capital;
