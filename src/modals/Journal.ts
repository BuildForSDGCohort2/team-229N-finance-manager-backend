import * as mongoose from 'mongoose';

const journalSchema = new mongoose.Schema({
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
  ref: {
    type: String,
  },
  pd: {
    type: Date,
    //   default: Date.now
  },
});

const Journal = mongoose.model('Journal', journalSchema);

export default Journal;
