import * as mongoose from 'mongoose';

const machineSchema = new mongoose.Schema({
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
  sold: {
    type: Boolean,
    default: false,
  },
});

const Machine = mongoose.model('Machine', machineSchema);

export default Machine;
